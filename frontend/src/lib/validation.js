const STX_ADDRESS_RE = /^S[PTMN][0-9A-HJ-NP-Z]{38,40}$/
const BTC_BECH32_RE = /^(bc1|tb1)[0-9ac-hj-np-z]{20,87}$/
const BTC_LEGACY_RE = /^[13mn2][a-km-zA-HJ-NP-Z1-9]{25,39}$/
const TX_ID_RE = /^(0x)?[0-9a-fA-F]{64}$/

export function isStxAddress(value) {
  return typeof value === 'string' && STX_ADDRESS_RE.test(value)
}

export function isBtcAddress(value) {
  if (typeof value !== 'string') return false
  return BTC_BECH32_RE.test(value) || BTC_LEGACY_RE.test(value)
}

export function isTxId(value) {
  return typeof value === 'string' && TX_ID_RE.test(value)
}

export function isPositiveNumber(value) {
  const n = Number(value)
  return Number.isFinite(n) && n > 0
}

export function isNonNegativeInteger(value) {
  const n = Number(value)
  return Number.isInteger(n) && n >= 0
}
