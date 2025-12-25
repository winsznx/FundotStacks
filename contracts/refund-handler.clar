;; FundotStacks - Refund Handler Contract (Clarity 4)
;; Manages refund tracking for failed or cancelled campaigns
;; NO CUSTODY - Creator must manually refund, contract only tracks state

;; Constants
(define-constant err-not-found (err u301))
(define-constant err-not-cancelled (err u302))
(define-constant err-no-contribution (err u303))
(define-constant err-already-refunded (err u304))
(define-constant err-refund-failed (err u305))
(define-constant err-unauthorized (err u306))

;; Data Maps
(define-map refund-processed
  { campaign-id: uint, backer: principal }
  { processed: bool, amount: uint, timestamp: uint }
)

;; Public Functions

;; Mark refund as processed (called by creator after manual refund)
(define-public (mark-refund-processed 
    (campaign-id uint) 
    (backer principal)
    (contribution-amount uint)
  )
  (let
    (
      (refund-record (map-get? refund-processed { campaign-id: campaign-id, backer: backer }))
    )
    ;; Validations
    (asserts! (> contribution-amount u0) err-no-contribution)
    (asserts! 
      (or 
        (is-none refund-record)
        (not (get processed (unwrap-panic refund-record)))
      ) 
      err-already-refunded
    )
    
    ;; Mark as processed
    (map-set refund-processed
      { campaign-id: campaign-id, backer: backer }
      {
        processed: true,
        amount: contribution-amount,
        timestamp: stacks-block-height
      }
    )
    
    ;; Emit event
    (print {
      event: "refund-marked-processed",
      campaign-id: campaign-id,
      backer: backer,
      amount: contribution-amount
    })
    
    (ok contribution-amount)
  )
)

;; Read-Only Functions

(define-read-only (is-refund-processed (campaign-id uint) (backer principal))
  (match (map-get? refund-processed { campaign-id: campaign-id, backer: backer })
    record (ok (get processed record))
    (ok false)
  )
)

(define-read-only (get-refund-details (campaign-id uint) (backer principal))
  (ok (map-get? refund-processed { campaign-id: campaign-id, backer: backer }))
)
