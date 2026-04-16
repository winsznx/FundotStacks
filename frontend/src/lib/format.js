import { MICROSTX_PER_STX, SATS_PER_BTC, STX_DECIMALS, BTC_DECIMALS } from '@/constants/currency'

const safeNumber = (value) => {
  if (value === null || value === undefined) return 0
  const n = typeof value === 'bigint' ? Number(value) : Number(value)
  return Number.isFinite(n) ? n : 0
}

export function formatSTX(amount, decimals = 2) {
  return `${safeNumber(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} STX`
}

export function formatBTC(amount, decimals = 4) {
  return `${safeNumber(amount).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })} BTC`
}

export function formatSats(sats) {
  return `${Math.round(safeNumber(sats)).toLocaleString('en-US')} sats`
}

export function formatUSD(amount, decimals = 2) {
  return safeNumber(amount).toLocaleString('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatNumber(value, decimals = 0) {
  return safeNumber(value).toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  })
}

export function formatPercent(value, decimals = 1) {
  return `${safeNumber(value).toFixed(decimals)}%`
}

export function microSTXToSTX(micro) {
  return safeNumber(micro) / MICROSTX_PER_STX
}

export function stxToMicroSTX(stx) {
  return Math.round(safeNumber(stx) * MICROSTX_PER_STX)
}

export function satsToBTC(sats) {
  return safeNumber(sats) / SATS_PER_BTC
}

export function btcToSats(btc) {
  return Math.round(safeNumber(btc) * SATS_PER_BTC)
}

export { STX_DECIMALS, BTC_DECIMALS }
