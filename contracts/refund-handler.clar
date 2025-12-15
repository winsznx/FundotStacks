;; FundotStacks - Refund Handler Contract
;; Manages automatic refund processing for failed or cancelled campaigns

;; Constants
(define-constant err-not-found (err u301))
(define-constant err-not-cancelled (err u302))
(define-constant err-no-contribution (err u303))
(define-constant err-already-refunded (err u304))
(define-constant err-refund-failed (err u305))

;; Data Maps
(define-map refund-processed
  { campaign-id: uint, backer: principal }
  { processed: bool, amount: uint, timestamp: uint }
)

;; Public Functions

;; Process refund for a single backer
(define-public (process-refund 
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
    
    ;; Transfer STX back to backer
    (try! (as-contract (stx-transfer? contribution-amount tx-sender backer)))
    
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
      event: "refund-processed",
      campaign-id: campaign-id,
      backer: backer,
      amount: contribution-amount
    })
    
    (ok contribution-amount)
  )
)

;; Batch process refunds (for campaigns with few backers)
(define-public (batch-process-refunds 
    (campaign-id uint)
    (backers (list 50 { backer: principal, amount: uint }))
  )
  (begin
    (map process-single-refund backers)
    (ok (len backers))
  )
)

;; Private helper for batch processing
(define-private (process-single-refund (backer-data { backer: principal, amount: uint }))
  (match (process-refund 
    u0 ;; campaign-id would be passed from context
    (get backer backer-data)
    (get amount backer-data)
  )
    success true
    error false
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
