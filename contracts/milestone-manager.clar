;; FundotStacks - Milestone Manager Contract (Clarity 4)
;; Manages milestone-based fund releases for campaigns
;; NO CUSTODY - Tracks milestones only, creator holds funds

;; Constants
(define-constant err-not-found (err u201))
(define-constant err-unauthorized (err u202))
(define-constant err-invalid-percentage (err u203))
(define-constant err-already-released (err u204))
(define-constant err-not-verified (err u205))
(define-constant err-invalid-milestone (err u206))
(define-constant err-milestones-full (err u207))

;; Data Variables
(define-data-var platform-admin principal tx-sender)

;; Data Maps
(define-map campaign-milestone-config
  { campaign-id: uint }
  {
    total-milestones: uint,
    completed-milestones: uint,
    verification-required: bool
  }
)

(define-map milestones
  { campaign-id: uint, milestone-id: uint }
  {
    description: (string-utf8 200),
    percentage: uint,
    released: bool,
    verified: bool,
    verifier: (optional principal)
  }
)

;; Public Functions

;; Initialize milestones for a campaign
(define-public (initialize-campaign-milestones (campaign-id uint) (verification-required bool))
  (let
    (
      (existing-config (map-get? campaign-milestone-config { campaign-id: campaign-id }))
    )
    ;; Check if already initialized
    (asserts! (is-none existing-config) err-unauthorized)
    
    ;; Create config
    (map-set campaign-milestone-config
      { campaign-id: campaign-id }
      {
        total-milestones: u0,
        completed-milestones: u0,
        verification-required: verification-required
      }
    )
    
    (ok true)
  )
)

;; Add a milestone
(define-public (add-milestone 
    (campaign-id uint)
    (milestone-id uint)
    (description (string-utf8 200))
    (percentage uint)
  )
  (let
    (
      (config (unwrap! (map-get? campaign-milestone-config { campaign-id: campaign-id }) err-not-found))
      (existing-milestone (map-get? milestones { campaign-id: campaign-id, milestone-id: milestone-id }))
    )
    ;; Validations
    (asserts! (is-none existing-milestone) err-invalid-milestone)
    (asserts! (and (> percentage u0) (<= percentage u100)) err-invalid-percentage)
    
    ;; Create milestone
    (map-set milestones
      { campaign-id: campaign-id, milestone-id: milestone-id }
      {
        description: description,
        percentage: percentage,
        released: false,
        verified: false,
        verifier: none
      }
    )
    
    ;; Update config
    (map-set campaign-milestone-config
      { campaign-id: campaign-id }
      (merge config {
        total-milestones: (+ (get total-milestones config) u1)
      })
    )
    
    (ok true)
  )
)

;; Verify a milestone (admin only)
(define-public (verify-milestone (campaign-id uint) (milestone-id uint) (approved bool))
  (let
    (
      (milestone (unwrap! (map-get? milestones { campaign-id: campaign-id, milestone-id: milestone-id }) err-not-found))
    )
    ;; Validations
    (asserts! (is-eq tx-sender (var-get platform-admin)) err-unauthorized)
    (asserts! (not (get released milestone)) err-already-released)
    
    ;; Update milestone
    (map-set milestones
      { campaign-id: campaign-id, milestone-id: milestone-id }
      (merge milestone {
        verified: approved,
        verifier: (some tx-sender)
      })
    )
    
    (ok approved)
  )
)

;; Mark milestone as released (for tracking only - funds already with creator)
(define-public (mark-milestone-released 
    (campaign-id uint) 
    (milestone-id uint)
  )
  (let
    (
      (milestone (unwrap! (map-get? milestones { campaign-id: campaign-id, milestone-id: milestone-id }) err-not-found))
      (config (unwrap! (map-get? campaign-milestone-config { campaign-id: campaign-id }) err-not-found))
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
      milestone-id: milestone-id
    })
    
    (ok true)
  )
)

;; Admin function to set platform admin
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

(define-read-only (get-platform-admin)
  (ok (var-get platform-admin))
)
