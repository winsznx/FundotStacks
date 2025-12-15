;; FundotStacks - Campaign Core Contract
;; Main contract for campaign creation, funding, and lifecycle management
;; clarity-version: 4

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u100))
(define-constant err-not-found (err u101))
(define-constant err-unauthorized (err u102))
(define-constant err-invalid-amount (err u103))
(define-constant err-invalid-deadline (err u104))
(define-constant err-campaign-ended (err u105))
(define-constant err-campaign-not-active (err u106))
(define-constant err-already-funded (err u107))
(define-constant err-not-creator (err u108))
(define-constant err-invalid-status (err u109))
(define-constant err-invalid-title (err u110))
(define-constant err-invalid-description (err u111))

;; Campaign status constants
(define-constant STATUS-ACTIVE u1)
(define-constant STATUS-FUNDED u2)
(define-constant STATUS-COMPLETED u3)
(define-constant STATUS-CANCELLED u4)

;; Minimum and maximum constraints
(define-constant MIN-GOAL u1000000) ;; 1 STX minimum
(define-constant MAX-GOAL u1000000000000) ;; 1,000,000 STX maximum
(define-constant MIN-DEADLINE-BLOCKS u144) ;; ~24 hours minimum
(define-constant MIN-TITLE-LENGTH u10)
(define-constant MAX-TITLE-LENGTH u100)
(define-constant MIN-DESCRIPTION-LENGTH u50)
(define-constant MAX-DESCRIPTION-LENGTH u500)

;; Data Variables
(define-data-var campaign-counter uint u0)

;; Data Maps
(define-map campaigns
  { campaign-id: uint }
  {
    creator: principal,
    title: (string-ascii 100),
    description: (string-utf8 500),
    goal-amount: uint,
    raised-amount: uint,
    deadline: uint,
    status: uint,
    milestones-enabled: bool,
    created-at: uint
  }
)

(define-map contributions
  { campaign-id: uint, backer: principal }
  { amount: uint, timestamp: uint }
)

(define-map creator-campaigns
  { creator: principal, index: uint }
  { campaign-id: uint }
)

(define-map creator-campaign-count
  { creator: principal }
  { count: uint }
)

;; Private Functions

(define-private (is-valid-title (title (string-ascii 100)))
  (let ((len (len title)))
    (and (>= len MIN-TITLE-LENGTH) (<= len MAX-TITLE-LENGTH))
  )
)

(define-private (is-valid-description (description (string-utf8 500)))
  (let ((len (len description)))
    (and (>= len MIN-DESCRIPTION-LENGTH) (<= len MAX-DESCRIPTION-LENGTH))
  )
)

(define-private (increment-creator-campaign-count (creator principal))
  (let ((current-count (default-to u0 (get count (map-get? creator-campaign-count { creator: creator })))))
    (map-set creator-campaign-count { creator: creator } { count: (+ current-count u1) })
    current-count
  )
)

;; Public Functions

;; Create a new campaign
(define-public (create-campaign 
    (title (string-ascii 100))
    (description (string-utf8 500))
    (goal-amount uint)
    (deadline uint)
    (milestones-enabled bool)
  )
  (let
    (
      (campaign-id (+ (var-get campaign-counter) u1))
      (creator tx-sender)
      (current-block stacks-block-height)
      (creator-index (increment-creator-campaign-count tx-sender))
    )
    ;; Validations
    (asserts! (is-valid-title title) err-invalid-title)
    (asserts! (is-valid-description description) err-invalid-description)
    (asserts! (and (>= goal-amount MIN-GOAL) (<= goal-amount MAX-GOAL)) err-invalid-amount)
    (asserts! (>= deadline (+ current-block MIN-DEADLINE-BLOCKS)) err-invalid-deadline)
    
    ;; Store campaign
    (map-set campaigns
      { campaign-id: campaign-id }
      {
        creator: creator,
        title: title,
        description: description,
        goal-amount: goal-amount,
        raised-amount: u0,
        deadline: deadline,
        status: STATUS-ACTIVE,
        milestones-enabled: milestones-enabled,
        created-at: current-block
      }
    )
    
    ;; Store creator campaign reference
    (map-set creator-campaigns
      { creator: creator, index: creator-index }
      { campaign-id: campaign-id }
    )
    
    ;; Increment counter
    (var-set campaign-counter campaign-id)
    
    ;; Emit event and return campaign ID
    (print {
      event: "campaign-created",
      campaign-id: campaign-id,
      creator: creator,
      goal: goal-amount,
      deadline: deadline
    })
    (ok campaign-id)
  )
)

;; Fund a campaign
(define-public (fund-campaign (campaign-id uint) (amount uint))
  (let
    (
      (campaign (unwrap! (map-get? campaigns { campaign-id: campaign-id }) err-not-found))
      (backer tx-sender)
      (current-contribution (default-to { amount: u0, timestamp: u0 } 
        (map-get? contributions { campaign-id: campaign-id, backer: backer })))
      (new-raised (+ (get raised-amount campaign) amount))
      (new-status (if (>= new-raised (get goal-amount campaign)) STATUS-FUNDED (get status campaign)))
    )
    ;; Validations
    (asserts! (> amount u0) err-invalid-amount)
    (asserts! (is-eq (get status campaign) STATUS-ACTIVE) err-campaign-not-active)
    (asserts! (<= stacks-block-height (get deadline campaign)) err-campaign-ended)
    
    ;; Transfer STX to contract
    (try! (stx-transfer? amount backer (as-contract tx-sender)))
    
    ;; Update contribution
    (map-set contributions
      { campaign-id: campaign-id, backer: backer }
      {
        amount: (+ (get amount current-contribution) amount),
        timestamp: stacks-block-height
      }
    )
    
    ;; Update campaign
    (map-set campaigns
      { campaign-id: campaign-id }
      (merge campaign {
        raised-amount: new-raised,
        status: new-status
      })
    )
    
    ;; Emit event
    (print {
      event: "funding-received",
      campaign-id: campaign-id,
      backer: backer,
      amount: amount,
      new-total: new-raised,
      goal-reached: (>= new-raised (get goal-amount campaign))
    })
    
    (ok true)
  )
)

;; Finalize campaign and release funds to creator
(define-public (finalize-campaign (campaign-id uint))
  (let
    (
      (campaign (unwrap! (map-get? campaigns { campaign-id: campaign-id }) err-not-found))
      (caller tx-sender)
    )
    ;; Validations
    (asserts! (is-eq caller (get creator campaign)) err-not-creator)
    (asserts! (is-eq (get status campaign) STATUS-FUNDED) err-invalid-status)
    
    ;; Transfer funds to creator
    (try! (as-contract (stx-transfer? (get raised-amount campaign) tx-sender (get creator campaign))))
    
    ;; Update status
    (map-set campaigns
      { campaign-id: campaign-id }
      (merge campaign { status: STATUS-COMPLETED })
    )
    
    ;; Emit event
    (print {
      event: "campaign-completed",
      campaign-id: campaign-id,
      creator: (get creator campaign),
      amount: (get raised-amount campaign)
    })
    
    (ok true)
  )
)

;; Cancel campaign (for failed campaigns or creator cancellation)
(define-public (cancel-campaign (campaign-id uint))
  (let
    (
      (campaign (unwrap! (map-get? campaigns { campaign-id: campaign-id }) err-not-found))
      (caller tx-sender)
    )
    ;; Validations
    (asserts! (is-eq caller (get creator campaign)) err-not-creator)
    (asserts! (is-eq (get status campaign) STATUS-ACTIVE) err-invalid-status)
    
    ;; Can only cancel if deadline passed and goal not met, or before deadline
    (asserts! 
      (or 
        (> stacks-block-height (get deadline campaign))
        (< (get raised-amount campaign) (get goal-amount campaign))
      )
      err-already-funded
    )
    
    ;; Update status
    (map-set campaigns
      { campaign-id: campaign-id }
      (merge campaign { status: STATUS-CANCELLED })
    )
    
    ;; Emit event
    (print {
      event: "campaign-cancelled",
      campaign-id: campaign-id,
      raised-amount: (get raised-amount campaign)
    })
    
    (ok true)
  )
)

;; Read-Only Functions

(define-read-only (get-campaign (campaign-id uint))
  (ok (map-get? campaigns { campaign-id: campaign-id }))
)

(define-read-only (get-contribution (campaign-id uint) (backer principal))
  (ok (map-get? contributions { campaign-id: campaign-id, backer: backer }))
)

(define-read-only (get-total-campaigns)
  (ok (var-get campaign-counter))
)

(define-read-only (get-creator-campaign-count (creator principal))
  (ok (default-to u0 (get count (map-get? creator-campaign-count { creator: creator }))))
)

(define-read-only (get-creator-campaign (creator principal) (index uint))
  (ok (map-get? creator-campaigns { creator: creator, index: index }))
)

(define-read-only (get-campaign-status (campaign-id uint))
  (ok (get status (unwrap! (map-get? campaigns { campaign-id: campaign-id }) err-not-found)))
)

(define-read-only (is-campaign-active (campaign-id uint))
  (let
    (
      (campaign (unwrap! (map-get? campaigns { campaign-id: campaign-id }) err-not-found))
    )
    (ok (and 
      (is-eq (get status campaign) STATUS-ACTIVE)
      (<= stacks-block-height (get deadline campaign))
    ))
  )
)
