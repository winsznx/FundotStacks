;; FundotStacks - Campaign Core Contract (Clarity 4)
;; Main contract for campaign creation, funding, and lifecycle management
;; NO CUSTODY MODEL - Contract only tracks state, funds held by creator directly

;; Constants
(define-constant contract-owner tx-sender)

;; Simplified error constants to avoid VM naming conflicts
(define-constant ERR-UNAUTHORIZED (err u100))
(define-constant ERR-NOT-FOUND (err u101))
(define-constant ERR-INVALID-PARAMS (err u102))
(define-constant ERR-INVALID-STATUS (err u103))

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
      (creator-index (increment-creator-campaign-count creator))
    )
    ;; Validations
    (asserts! (is-valid-title title) ERR-INVALID-PARAMS)
    (asserts! (is-valid-description description) ERR-INVALID-PARAMS)
    (asserts! (and (>= goal-amount MIN-GOAL) (<= goal-amount MAX-GOAL)) ERR-INVALID-PARAMS)
    (asserts! (>= deadline (+ stacks-block-height MIN-DEADLINE-BLOCKS)) ERR-INVALID-PARAMS)
    
    ;; Create campaign
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
        created-at: stacks-block-height
      }
    )
    
    ;; Link to creator
    (map-set creator-campaigns
      { creator: creator, index: creator-index }
      { campaign-id: campaign-id }
    )
    
    ;; Increment counter
    (var-set campaign-counter campaign-id)
    
    ;; Emit event
    (print {
      event: "campaign-created",
      campaign-id: campaign-id,
      creator: creator,
      goal-amount: goal-amount,
      deadline: deadline
    })
    
    (ok campaign-id)
  )
)

;; Fund a campaign - backers send STX DIRECTLY to creator (no custody)
(define-public (fund-campaign (campaign-id uint) (amount uint))
  (let
    (
      (campaign (unwrap! (map-get? campaigns { campaign-id: campaign-id }) ERR-NOT-FOUND))
      (backer tx-sender)
      (current-contribution (default-to { amount: u0, timestamp: u0 } 
        (map-get? contributions { campaign-id: campaign-id, backer: backer })))
      (new-raised (+ (get raised-amount campaign) amount))
      (new-status (if (>= new-raised (get goal-amount campaign)) STATUS-FUNDED (get status campaign)))
    )
    ;; Validations
    (asserts! (> amount u0) ERR-INVALID-PARAMS)
    (asserts! (is-eq (get status campaign) STATUS-ACTIVE) ERR-INVALID-STATUS)
    (asserts! (<= stacks-block-height (get deadline campaign)) ERR-INVALID-STATUS)
    
    ;; Transfer STX DIRECTLY from backer to creator (no contract custody!)
    (try! (stx-transfer? amount backer (get creator campaign)))
    
    ;; Update contribution record
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

;; Mark campaign as completed (creator only)
(define-public (complete-campaign (campaign-id uint))
  (let
    (
      (campaign (unwrap! (map-get? campaigns { campaign-id: campaign-id }) ERR-NOT-FOUND))
    )
    ;; Validations
    (asserts! (is-eq tx-sender (get creator campaign)) ERR-UNAUTHORIZED)
    (asserts! (is-eq (get status campaign) STATUS-FUNDED) ERR-INVALID-STATUS)
    
    ;; Update status
    (map-set campaigns
      { campaign-id: campaign-id }
      (merge campaign { status: STATUS-COMPLETED })
    )
    
    ;; Emit event
    (print {
      event: "campaign-completed",
      campaign-id: campaign-id,
      amount: (get raised-amount campaign)
    })
    
    (ok true)
  )
)

;; Cancel campaign (only if not funded and deadline passed)
(define-public (cancel-campaign (campaign-id uint))
  (let
    (
      (campaign (unwrap! (map-get? campaigns { campaign-id: campaign-id }) ERR-NOT-FOUND))
    )
    ;; Validations
    (asserts! (is-eq tx-sender (get creator campaign)) ERR-UNAUTHORIZED)
    (asserts! (is-eq (get status campaign) STATUS-ACTIVE) ERR-INVALID-STATUS)
    (asserts! (> stacks-block-height (get deadline campaign)) ERR-INVALID-STATUS)
    
    ;; Update status
    (map-set campaigns
      { campaign-id: campaign-id }
      (merge campaign { status: STATUS-CANCELLED })
    )
    
    ;; Emit event
    (print {
      event: "campaign-cancelled",
      campaign-id: campaign-id
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

(define-read-only (get-campaign-count)
  (ok (var-get campaign-counter))
)

(define-read-only (get-creator-campaign-count (creator principal))
  (ok (default-to u0 (get count (map-get? creator-campaign-count { creator: creator }))))
)

(define-read-only (get-creator-campaign (creator principal) (index uint))
  (ok (map-get? creator-campaigns { creator: creator, index: index }))
)
