/**
 * Stacks Explorer Link Utilities
 */

import { EXPLORER_URL } from '../api/stacks-client.js';

/**
 * Generates explorer URL for an address
 */
export function getAddressUrl(address) {
  if (!address) return '';
  return `${EXPLORER_URL}/address/${address}`;
}

/**
 * Generates explorer URL for a transaction ID
 */
export function getTxUrl(txId) {
  if (!txId) return '';
  return `${EXPLORER_URL}/txid/${txId}`;
}

/**
 * Generates explorer URL for a contract principal
 */
export function getContractUrl(contractId) {
  if (!contractId) return '';
  return `${EXPLORER_URL}/contract/${contractId}`;
}

/**
 * Opens explorer URL in a new tab
 */
export function openInExplorer(type, id) {
  let url = '';
  switch (type) {
    case 'address': url = getAddressUrl(id); break;
    case 'tx': url = getTxUrl(id); break;
    case 'contract': url = getContractUrl(id); break;
    default: break;
  }
  
  if (url) {
    window.open(url, '_blank', 'noopener,noreferrer');
  }
}
