const MAINNET_BASE = 'https://explorer.hiro.so'
const TESTNET_SUFFIX = '?chain=testnet'

function suffix(network) {
  return network === 'mainnet' ? '' : TESTNET_SUFFIX
}

export function buildExplorerTxUrl(txId, network = 'testnet') {
  if (!txId) return MAINNET_BASE
  return `${MAINNET_BASE}/txid/${txId}${suffix(network)}`
}

export function buildExplorerAddressUrl(address, network = 'testnet') {
  if (!address) return MAINNET_BASE
  return `${MAINNET_BASE}/address/${address}${suffix(network)}`
}

export function buildExplorerBlockUrl(blockHeight, network = 'testnet') {
  return `${MAINNET_BASE}/block/${blockHeight}${suffix(network)}`
}
