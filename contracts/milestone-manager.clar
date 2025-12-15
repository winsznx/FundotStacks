;; FundotStacks - Milestone Manager Contract
;; Manages milestone-based fund releases for campaigns
;; clarity-version: 4

;; Constants
(define-constant err-not-found (err u201))
(define-constant err-unauthorized (err u202))
(define-constant err-invalid-percentage (err u203))
(define-constant err-already-released (err u204))
(define-constant err-not-verified (err u205))
(define-constant err-milestones-not-enabled (err u206))
(define-constant err-percentage-exceeded (err u207))
(define-constant err-not-funded (err u208))
(define-constant err-already-verified (err u209))

;; Data Variables
(define-data-var platform-admin principal tx-sender)

;; Data Maps
(define-map milestones
  { campaign-id: uint, milestone-id: uint }
  {
    description: (string-utf8 200),
    percentage: uint,
    released: bool,
    verified: bool,
    verifier: (optional principal),
    created-at: uint
  }
)

(define-map campaign-milestone-config
  { campaign-id: uint }
  {
    total-milestones: uint,
    completed-milestones: uint,
    total-percentage: uint,
    verification-required: bool
  }
)

;; Private Functions

(define-private (get-campaign-raised-amount (campaign-id uint))
  ;; This would call the campaign-core contract to get raised amount
  ;; For now, we'll define it as a trait call in production
  u0
)

;; Public Functions

;; Initialize milestone config for a campaign
(define-public (initialize-campaign-milestones (campaign-id uint) (verification-required bool))
  (begin
    (asserts! (is-none (map-get? campaign-milestone-config { campaign-id: campaign-id })) err-already-verified)
    
    (map-set campaign-milestone-config
      { campaign-id: campaign-id }
      {
        total-milestones: u0,
        completed-milestones: u0,
        total-percentage: u0,
        verification-required: verification-required
      }
    )
    
    (ok true)
  )
)

;; Add a milestone to a campaign
(define-public (add-milestone
    (campaign-id uint)
    (description (string-utf8 200))
    (percentage uint)
  )
  (let
    (
      (config (unwrap! (map-get? campaign-milestone-config { campaign-id: campaign-id }) err-not-found))
      (milestone-id (+ (get total-milestones config) u1))
      (new-total-percentage (+ (get total-percentage config) percentage))
    )
    ;; Validations
    (asserts! (> percentage u0) err-invalid-percentage)
    (asserts! (<= percentage u100) err-invalid-percentage)
    (asserts! (<= new-total-percentage u100) err-percentage-exceeded)
    
    ;; Create milestone
    (map-set milestones
      { campaign-id: campaign-id, milestone-id: milestone-id }
      {
        description: description,
        percentage: percentage,
        released: false,
        verified: false,
        verifier: none,
        created-at: stacks-block-height
      }
    )
    
    ;; Update config
    (map-set campaign-milestone-config
      { campaign-id: campaign-id }
      (merge config {
        total-milestones: milestone-id,
        total-percentage: new-total-percentage
      })
    )
    
    ;; Emit event
    (print {
      event: "milestone-added",
      campaign-id: campaign-id,
      milestone-id: milestone-id,
      percentage: percentage
    })
    
    (ok milestone-id)
  )
)

;; Verify a milestone
(define-public (verify-milestone (campaign-id uint) (milestone-id uint) (approved bool))
  (let
    (
      (milestone (unwrap! (map-get? milestones { campaign-id: campaign-id, milestone-id: milestone-id }) err-not-found))
      (config (unwrap! (map-get? campaign-milestone-config { campaign-id: campaign-id }) err-not-found))
      (verifier tx-sender)
    )
    ;; Validations - only platform admin or designated verifiers can verify
    ;; In production, this would check against a list of authorized verifiers
    (asserts! (not (get verified milestone)) err-already-verified)
    
    ;; Update milestone
    (map-set milestones
      { campaign-id: campaign-id, milestone-id: milestone-id }
      (merge milestone {
        verified: approved,
        verifier: (some verifier)
      })
    )
    
    ;; Emit event
    (print {
      event: "milestone-verified",
      campaign-id: campaign-id,
      milestone-id: milestone-id,
      approved: approved,
      verifier: verifier
    })
    
    (ok true)
  )
)

;; Release funds for a verified milestone
(define-public (release-milestone-funds 
    (campaign-id uint) 
    (milestone-id uint)
    (raised-amount uint)
    (creator principal)
  )
  (let
    (
      (milestone (unwrap! (map-get? milestones { campaign-id: campaign-id, milestone-id: milestone-id }) err-not-found))
      (config (unwrap! (map-get? campaign-milestone-config { campaign-id: campaign-id }) err-not-found))
      (release-amount (/ (* raised-amount (get percentage milestone)) u100))
    )
    ;; Validations
    (asserts! (not (get released milestone)) err-already-released)
    (asserts! 
      (or 
        (get verified milestone)
        (not (get verification-required config))
      ) 
      err-not-verified
    )
    
    ;; Transfer funds to creator
    (try! (as-contract (stx-transfer? release-amount tx-sender creator)))
    
    ;; Update milestone
    (map-set milestones
      { campaign-id: campaign-id, milestone-id: milestone-id }
      (merge milestone { released: true })
    )
    
    ;; Update config
    (map-set campaign-milestone-config
      { campaign-id: campaign-id }
      (merge config {
        completed-milestones: (+ (get completed-milestones config) u1)
      })
    )
    
    ;; Emit event
    (print {
      event: "milestone-released",
      campaign-id: campaign-id,
      milestone-id: milestone-id,
      amount: release-amount,
      creator: creator
    })
    
    (ok release-amount)
  )
)

;; Update platform admin
(define-public (set-platform-admin (new-admin principal))
  (begin
    (asserts! (is-eq tx-sender (var-get platform-admin)) err-unauthorized)
    (var-set platform-admin new-admin)
    (ok true)
  )
)

;; Read-Only Functions

(define-read-only (get-milestone (campaign-id uint) (milestone-id uint))
  (ok (map-get? milestones { campaign-id: campaign-id, milestone-id: milestone-id }))
)

(define-read-only (get-campaign-milestone-config (campaign-id uint))
  (ok (map-get? campaign-milestone-config { campaign-id: campaign-id }))
)

(define-read-only (get-total-milestones (campaign-id uint))
  (ok (get total-milestones (unwrap! (map-get? campaign-milestone-config { campaign-id: campaign-id }) err-not-found)))
)

(define-read-only (is-milestone-completed (campaign-id uint) (milestone-id uint))
  (let
    (
      (milestone (unwrap! (map-get? milestones { campaign-id: campaign-id, milestone-id: milestone-id }) err-not-found))
    )
    (ok (get released milestone))
  )
)

(define-read-only (get-platform-admin)
  (ok (var-get platform-admin))
)
