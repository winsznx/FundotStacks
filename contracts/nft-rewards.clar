;; FundotStacks - NFT Rewards Contract
;; SIP-009 compliant NFT implementation for backer rewards

;; Constants
(define-constant contract-owner tx-sender)
(define-constant err-owner-only (err u400))
(define-constant err-not-found (err u401))
(define-constant err-unauthorized (err u402))
(define-constant err-already-minted (err u403))

;; NFT Tiers
(define-constant TIER-BRONZE u1)
(define-constant TIER-SILVER u2)
(define-constant TIER-GOLD u3)

;; Data Variables
(define-data-var token-id-counter uint u0)
(define-data-var base-uri (string-ascii 256) "ipfs://")

;; Data Maps
(define-map token-owner
  { token-id: uint }
  { owner: principal }
)

(define-map token-metadata
  { token-id: uint }
  {
    campaign-id: uint,
    backer: principal,
    tier: uint,
    contribution-amount: uint,
    minted-at: uint
  }
)

(define-map backer-nft
  { campaign-id: uint, backer: principal }
  { token-id: uint }
)

;; SIP-009 Functions

(define-read-only (get-last-token-id)
  (ok (var-get token-id-counter))
)

(define-read-only (get-token-uri (id uint))
  (ok (some (concat (var-get base-uri) (uint-to-ascii id))))
)

(define-read-only (get-owner (id uint))
  (ok (get owner (map-get? token-owner { token-id: id })))
)

(define-public (transfer (id uint) (sender principal) (recipient principal))
  (let
    (
      (owner (unwrap! (get owner (map-get? token-owner { token-id: id })) err-not-found))
    )
    (asserts! (is-eq tx-sender sender) err-unauthorized)
    (asserts! (is-eq sender owner) err-unauthorized)
    
    (map-set token-owner
      { token-id: id }
      { owner: recipient }
    )
    
    (print {
      event: "nft-transferred",
      token-id: id,
      from: sender,
      to: recipient
    })
    
    (ok true)
  )
)

;; Custom Functions

;; Mint NFT for backer
(define-public (mint-backer-nft 
    (campaign-id uint)
    (backer principal)
    (tier uint)
    (contribution-amount uint)
  )
  (let
    (
      (token-id (+ (var-get token-id-counter) u1))
      (existing-nft (map-get? backer-nft { campaign-id: campaign-id, backer: backer }))
    )
    ;; Check if NFT already minted for this backer on this campaign
    (asserts! (is-none existing-nft) err-already-minted)
    
    ;; Validate tier
    (asserts! 
      (or 
        (is-eq tier TIER-BRONZE)
        (or (is-eq tier TIER-SILVER) (is-eq tier TIER-GOLD))
      ) 
      err-unauthorized
    )
    
    ;; Mint NFT
    (map-set token-owner
      { token-id: token-id }
      { owner: backer }
    )
    
    ;; Set metadata
    (map-set token-metadata
      { token-id: token-id }
      {
        campaign-id: campaign-id,
        backer: backer,
        tier: tier,
        contribution-amount: contribution-amount,
        minted-at: stacks-block-height
      }
    )
    
    ;; Link to backer
    (map-set backer-nft
      { campaign-id: campaign-id, backer: backer }
      { token-id: token-id }
    )
    
    ;; Increment counter
    (var-set token-id-counter token-id)
    
    ;; Emit event
    (print {
      event: "nft-minted",
      token-id: token-id,
      campaign-id: campaign-id,
      backer: backer,
      tier: tier
    })
    
    (ok token-id)
  )
)

;; Calculate tier based on contribution amount
(define-read-only (calculate-tier (contribution-amount uint) (goal-amount uint))
  (let
    (
      (percentage (/ (* contribution-amount u100) goal-amount))
    )
    (if (>= percentage u10)
      TIER-GOLD
      (if (>= percentage u5)
        TIER-SILVER
        TIER-BRONZE
      )
    )
  )
)

;; Update base URI (owner only)
(define-public (set-base-uri (new-uri (string-ascii 256)))
  (begin
    (asserts! (is-eq tx-sender contract-owner) err-owner-only)
    (var-set base-uri new-uri)
    (ok true)
  )
)

;; Read-Only Functions

(define-read-only (get-token-metadata (token-id uint))
  (ok (map-get? token-metadata { token-id: token-id }))
)

(define-read-only (get-backer-nft (campaign-id uint) (backer principal))
  (ok (map-get? backer-nft { campaign-id: campaign-id, backer: backer }))
)

(define-read-only (get-tier-name (tier uint))
  (if (is-eq tier TIER-GOLD)
    (ok "Gold Supporter")
    (if (is-eq tier TIER-SILVER)
      (ok "Silver Supporter")
      (ok "Bronze Supporter")
    )
  )
)

;; Helper to convert uint to ascii (simplified version)
(define-private (uint-to-ascii (n uint))
  ;; In production, implement proper uint to string conversion
  ;; For now, return placeholder
  "0"
)
