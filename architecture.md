# FundotStacks - Complete Architecture Documentation

## Project Overview

**FundotStacks** is a decentralized crowdfunding platform built on the Stacks blockchain, enabling creators to launch campaigns and receive funding in STX tokens through trustless smart contracts. The platform leverages Clarity 4 smart contracts for security and transparency, with complete integration of Stacks Connect for wallet management and transaction handling.

**Core Value Proposition**: *"Launch, fund, and track crowdfunding campaigns with the security of Bitcoin through Stacks blockchain"*

---

## Vision

Create a transparent, trustless crowdfunding ecosystem where:
- Campaign creators can launch projects without intermediaries
- Backers have verifiable proof of fund allocation
- Smart contracts enforce funding goals and milestone-based releases
- All transactions are secured by Bitcoin's finality through Stacks

---

## Technology Stack

### Frontend
- **Framework**: React.js 18+ (with Vite)
- **UI Library**: TailwindCSS + ShadCN/UI
- **Blockchain Integration**: 
  - `@stacks/connect` (wallet connection and authentication)
  - `@stacks/transactions` (transaction construction and broadcasting)
  - `@stacks/network` (network configuration)
  - `@stacks/encryption` (data encryption for user profiles)
- **State Management**: Zustand for global state
- **Form Handling**: React Hook Form + Zod validation
- **HTTP Client**: Axios for API calls to Stacks node
- **Type Safety**: JavaScript with JSDoc (or TypeScript optional)

### Smart Contracts
- **Language**: Clarity 4 (latest stable)
- **Development Tools**: Clarinet for local testing and deployment
- **Contract Types**:
  - `campaign-core.clar` - Main campaign creation and funding logic
  - `milestone-manager.clar` - Milestone-based fund release
  - `refund-handler.clar` - Automatic refunds for failed campaigns
  - `nft-rewards.clar` - Optional: NFT rewards for backers
- **Testing**: Clarinet unit tests with 100% coverage on critical paths

### Blockchain Layer
- **Network**: Stacks Mainnet (with Testnet support)
- **Consensus**: Proof of Transfer (PoX) - secured by Bitcoin
- **Token Standard**: SIP-010 Fungible Token (for campaign tokens if needed)
- **NFT Standard**: SIP-009 (for backer rewards)
- **Storage**: On-chain data for campaign metadata, off-chain (IPFS/Gaia) for media

### Infrastructure
- **Hosting**: Vercel (frontend), Cloudflare (CDN)
- **Stacks Node**: Public Hiro API node (`https://api.mainnet.hiro.so`)
- **Data Indexing**: Stacks API for reading blockchain state
- **No Traditional Database**: All campaign state stored on-chain

---

## Project Structure

```
fundotstacks/
│
├── frontend/                      # React.js application
│   ├── src/
│   │   ├── api/                   # Stacks API integration
│   │   │   ├── stacks-client.js   # Stacks network configuration
│   │   │   ├── contract-calls.js  # Smart contract interaction functions
│   │   │   ├── queries.js         # Read-only contract calls
│   │   │   └── transactions.js    # Transaction builders
│   │   │
│   │   ├── components/            # Reusable UI components
│   │   │   ├── ui/                # ShadCN base components
│   │   │   ├── wallet/            # Wallet connection components
│   │   │   │   ├── ConnectButton.jsx
│   │   │   │   ├── WalletDisplay.jsx
│   │   │   │   └── NetworkSelector.jsx
│   │   │   ├── campaign/          # Campaign components
│   │   │   │   ├── CampaignCard.jsx
│   │   │   │   ├── CampaignForm.jsx
│   │   │   │   ├── FundingProgress.jsx
│   │   │   │   └── MilestoneTracker.jsx
│   │   │   └── common/            # Shared components
│   │   │       ├── LoadingSpinner.jsx
│   │   │       ├── ErrorBoundary.jsx
│   │   │       └── TransactionStatus.jsx
│   │   │
│   │   ├── sections/              # Page sections
│   │   │   ├── Hero.jsx
│   │   │   ├── FeaturedCampaigns.jsx
│   │   │   ├── CampaignDetails.jsx
│   │   │   └── CreatorDashboard.jsx
│   │   │
│   │   ├── pages/                 # Route-based pages
│   │   │   ├── Home.jsx
│   │   │   ├── ExploreCampaigns.jsx
│   │   │   ├── CampaignDetail.jsx
│   │   │   ├── CreateCampaign.jsx
│   │   │   ├── Dashboard.jsx
│   │   │   └── Profile.jsx
│   │   │
│   │   ├── hooks/                 # Custom React hooks
│   │   │   ├── useStacksAuth.js   # Wallet authentication
│   │   │   ├── useCampaigns.js    # Campaign data fetching
│   │   │   ├── useTransaction.js  # Transaction lifecycle
│   │   │   ├── useContractCall.js # Contract interaction wrapper
│   │   │   └── useNetwork.js      # Network switching
│   │   │
│   │   ├── store/                 # Zustand stores
│   │   │   ├── authStore.js       # User wallet state
│   │   │   ├── campaignStore.js   # Campaign cache
│   │   │   └── uiStore.js         # UI state (modals, toasts)
│   │   │
│   │   ├── utils/                 # Utility functions
│   │   │   ├── clarity-helpers.js # Clarity value conversion
│   │   │   ├── stx-formatter.js   # STX amount formatting
│   │   │   ├── validators.js      # Input validation
│   │   │   └── constants.js       # Contract addresses, ABIs
│   │   │
│   │   ├── styles/                # Global styles
│   │   │   └── globals.css
│   │   │
│   │   ├── assets/                # Static assets
│   │   │   ├── images/
│   │   │   └── icons/
│   │   │
│   │   └── tests/                 # Frontend tests
│   │       ├── components/
│   │       └── hooks/
│   │
│   ├── .env.example
│   ├── .eslintrc.json
│   ├── .prettierrc
│   ├── vite.config.js
│   └── package.json
│
├── contracts/                     # Clarity smart contracts
│   ├── campaign-core.clar         # Main campaign contract
│   ├── milestone-manager.clar     # Milestone fund release
│   ├── refund-handler.clar        # Refund logic
│   ├── nft-rewards.clar           # Backer NFT rewards
│   │
│   └── tests/                     # Clarinet tests
│       ├── campaign-core_test.ts
│       ├── milestone-manager_test.ts
│       └── refund-handler_test.ts
│
├── scripts/                       # Deployment scripts
│   ├── deploy-contracts.js
│   └── verify-contracts.js
│
├── docs/                          # Documentation
│   ├── ARCHITECTURE.md            # This file
│   ├── SMART_CONTRACTS.md         # Contract documentation
│   ├── API_REFERENCE.md           # API integration guide
│   ├── DEPLOYMENT.md              # Deployment guide
│   └── USER_GUIDE.md              # End-user documentation
│
├── Clarinet.toml                  # Clarinet configuration
├── .gitignore
├── README.md
└── package.json
```

---

## System Architecture

### High-Level Data Flow

```
┌─────────────────────────────────────────────────────────────┐
│                    USER (Web Browser)                       │
└─────────┬───────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│          FRONTEND (React + Stacks Connect)                  │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────┐     │
│  │ Wallet Auth  │  │   Campaign   │  │   Funding    │     │
│  │  (Connect)   │  │   Explorer   │  │   Interface  │     │
│  └──────────────┘  └──────────────┘  └──────────────┘     │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │   @stacks/connect (Authentication & Signing)        │   │
│  │   @stacks/transactions (TX Construction)            │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────┬───────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│             STACKS BLOCKCHAIN (via Hiro API)                │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         CLARITY SMART CONTRACTS                     │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────┐       │   │
│  │  │  campaign-core.clar                     │       │   │
│  │  │  - create-campaign()                    │       │   │
│  │  │  - fund-campaign()                      │       │   │
│  │  │  - finalize-campaign()                  │       │   │
│  │  │  - cancel-campaign()                    │       │   │
│  │  └─────────────────────────────────────────┘       │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────┐       │   │
│  │  │  milestone-manager.clar                 │       │   │
│  │  │  - add-milestone()                      │       │   │
│  │  │  - release-milestone-funds()            │       │   │
│  │  │  - verify-milestone()                   │       │   │
│  │  └─────────────────────────────────────────┘       │   │
│  │                                                     │   │
│  │  ┌─────────────────────────────────────────┐       │   │
│  │  │  refund-handler.clar                    │       │   │
│  │  │  - process-refund()                     │       │   │
│  │  │  - calculate-refund-amount()            │       │   │
│  │  └─────────────────────────────────────────┘       │   │
│  └─────────────────────────────────────────────────────┘   │
│                                                             │
│  ┌─────────────────────────────────────────────────────┐   │
│  │         STACKS API (Hiro Node)                      │   │
│  │  - Contract state queries                           │   │
│  │  - Transaction broadcasting                         │   │
│  │  - Event monitoring                                 │   │
│  └─────────────────────────────────────────────────────┘   │
└─────────────────────────────────────────────────────────────┘
          │
          ▼
┌─────────────────────────────────────────────────────────────┐
│           BITCOIN BLOCKCHAIN (Proof of Transfer)            │
│              - Transaction finality anchoring               │
└─────────────────────────────────────────────────────────────┘
```

---

## Core Components Deep Dive

### 1. Smart Contracts Layer (`/contracts/`)

#### A. Campaign Core Contract (`campaign-core.clar`)

**Purpose**: Main contract handling campaign lifecycle, funding, and completion.

**Data Structures**:

```clarity
;; Campaign status enum
(define-constant STATUS-ACTIVE u1)
(define-constant STATUS-FUNDED u2)
(define-constant STATUS-COMPLETED u3)
(define-constant STATUS-CANCELLED u4)

;; Campaign map structure
(define-map campaigns
  { campaign-id: uint }
  {
    creator: principal,
    title: (string-ascii 100),
    description: (string-utf8 500),
    goal-amount: uint,  ;; in micro-STX (1 STX = 1,000,000 micro-STX)
    raised-amount: uint,
    deadline: uint,     ;; block height
    status: uint,
    milestones-enabled: bool,
    created-at: uint
  }
)

;; Backer contributions map
(define-map contributions
  { campaign-id: uint, backer: principal }
  { amount: uint, timestamp: uint }
)
```

**Core Functions**:

1. **create-campaign**
   - **Parameters**: title, description, goal (micro-STX), deadline (block height), milestones-enabled
   - **Access**: Any authenticated user
   - **Validation**:
     - Goal > 0 and < 1,000,000 STX
     - Deadline must be future block (> block-height + 144) ~24 hours minimum
     - Title length 10-100 chars
   - **Actions**:
     - Generate campaign-id (incremental counter)
     - Store campaign data in map
     - Emit campaign-created event
   - **Returns**: (ok campaign-id)

2. **fund-campaign**
   - **Parameters**: campaign-id, amount (micro-STX)
   - **Access**: Any user with STX
   - **Validation**:
     - Campaign status = ACTIVE
     - Current block < deadline
     - Amount > 0
   - **Actions**:
     - Transfer STX from backer to contract (stx-transfer?)
     - Update raised-amount in campaign map
     - Record contribution in contributions map
     - If raised-amount >= goal-amount: set status to FUNDED
     - Emit funding-received event
   - **Returns**: (ok true)

3. **finalize-campaign**
   - **Parameters**: campaign-id
   - **Access**: Campaign creator only
   - **Validation**:
     - Status = FUNDED
     - If milestones enabled: all milestones completed
   - **Actions**:
     - Transfer raised funds to creator
     - Set status to COMPLETED
     - Emit campaign-completed event
   - **Returns**: (ok true)

4. **cancel-campaign**
   - **Parameters**: campaign-id
   - **Access**: Campaign creator only
   - **Validation**:
     - Status = ACTIVE
     - Block height > deadline OR raised-amount < goal-amount
   - **Actions**:
     - Call refund-handler contract to process refunds
     - Set status to CANCELLED
     - Emit campaign-cancelled event
   - **Returns**: (ok true)

**Read-Only Functions**:
- `get-campaign(campaign-id)` - Returns campaign details
- `get-contribution(campaign-id, backer)` - Returns backer's contribution
- `get-total-campaigns()` - Returns total campaign count
- `get-campaigns-by-creator(principal)` - Returns list of creator's campaigns

---

#### B. Milestone Manager Contract (`milestone-manager.clar`)

**Purpose**: Manage milestone-based fund releases for campaigns requiring phased funding.

**Data Structures**:

```clarity
;; Milestone structure
(define-map milestones
  { campaign-id: uint, milestone-id: uint }
  {
    description: (string-utf8 200),
    amount: uint,  ;; percentage of total (0-100)
    released: bool,
    verified: bool,
    verifier: (optional principal)
  }
)

;; Campaign milestone config
(define-map campaign-milestone-config
  { campaign-id: uint }
  {
    total-milestones: uint,
    completed-milestones: uint,
    verification-required: bool
  }
)
```

**Core Functions**:

1. **add-milestone**
   - **Parameters**: campaign-id, description, percentage-amount
   - **Access**: Campaign creator only
   - **Validation**:
     - Campaign has milestones-enabled = true
     - Campaign status = ACTIVE
     - Sum of all milestone percentages <= 100
   - **Actions**:
     - Store milestone in map
     - Increment total-milestones counter
   - **Returns**: (ok milestone-id)

2. **release-milestone-funds**
   - **Parameters**: campaign-id, milestone-id
   - **Access**: Campaign creator only
   - **Validation**:
     - Milestone verified = true (if verification required)
     - Milestone released = false
     - Campaign status = FUNDED
   - **Actions**:
     - Calculate release amount: (raised-amount * milestone-percentage / 100)
     - Transfer amount to creator
     - Set milestone released = true
     - Increment completed-milestones counter
   - **Returns**: (ok amount-released)

3. **verify-milestone**
   - **Parameters**: campaign-id, milestone-id, approved
   - **Access**: Designated verifier or platform admin
   - **Validation**:
     - Verifier is authorized
     - Milestone not yet verified
   - **Actions**:
     - Set milestone verified = approved
     - Record verifier principal
   - **Returns**: (ok true)

---

#### C. Refund Handler Contract (`refund-handler.clar`)

**Purpose**: Automatic refund processing for failed or cancelled campaigns.

**Core Functions**:

1. **process-refund**
   - **Parameters**: campaign-id, backer
   - **Access**: Called by campaign-core contract OR backer themselves
   - **Validation**:
     - Campaign status = CANCELLED
     - Backer has contribution > 0
     - Refund not yet processed
   - **Actions**:
     - Retrieve contribution amount from campaign-core
     - Transfer STX from contract to backer
     - Mark refund as processed
   - **Returns**: (ok refund-amount)

2. **batch-process-refunds**
   - **Parameters**: campaign-id, backer-list
   - **Access**: Platform admin or campaign creator
   - **Actions**:
     - Loop through backer-list and call process-refund for each
   - **Returns**: (ok refunds-processed-count)

---

#### D. NFT Rewards Contract (`nft-rewards.clar`)

**Purpose**: Issue commemorative NFTs to campaign backers as proof of support.

**Standard**: SIP-009 NFT trait implementation

**Core Functions**:

1. **mint-backer-nft**
   - **Parameters**: campaign-id, backer, tier (bronze/silver/gold based on contribution)
   - **Access**: Called by campaign-core after funding
   - **Actions**:
     - Generate unique token-id
     - Mint NFT to backer's address
     - Store metadata URI (IPFS link to campaign badge)
   - **Returns**: (ok token-id)

2. **get-token-uri**
   - **Parameters**: token-id
   - **Returns**: Metadata URI with campaign info and backer tier

---

### 2. Frontend Layer (`/frontend/src/`)

#### A. Stacks Integration (`/api/`)

##### `stacks-client.js` - Network Configuration

```javascript
/**
 * Initialize Stacks network client
 * Connects to Hiro API node based on environment
 */
import { StacksMainnet, StacksTestnet } from '@stacks/network';

export const getStacksNetwork = () => {
  const isMainnet = import.meta.env.VITE_STACKS_NETWORK === 'mainnet';
  
  return isMainnet 
    ? new StacksMainnet({ url: 'https://api.mainnet.hiro.so' })
    : new StacksTestnet({ url: 'https://api.testnet.hiro.so' });
};

export const EXPLORER_URL = 
  import.meta.env.VITE_STACKS_NETWORK === 'mainnet'
    ? 'https://explorer.hiro.so'
    : 'https://explorer.hiro.so/?chain=testnet';
```

##### `contract-calls.js` - Write Operations

```javascript
/**
 * Create a new crowdfunding campaign
 * @param {Object} campaignData - Campaign details
 * @param {string} userAddress - Creator's Stacks address
 * @returns {Promise<Object>} Transaction response
 */
import { openContractCall } from '@stacks/connect';
import { 
  stringAsciiCV, 
  stringUtf8CV, 
  uintCV,
  PostConditionMode 
} from '@stacks/transactions';

export async function createCampaign(campaignData, userAddress) {
  const { title, description, goalAmount, deadline } = campaignData;
  
  const functionArgs = [
    stringAsciiCV(title),
    stringUtf8CV(description),
    uintCV(goalAmount * 1000000), // Convert STX to micro-STX
    uintCV(deadline),
    boolCV(campaignData.milestonesEnabled || false)
  ];

  const txOptions = {
    contractAddress: import.meta.env.VITE_CONTRACT_DEPLOYER_ADDRESS,
    contractName: 'campaign-core',
    functionName: 'create-campaign',
    functionArgs,
    network: getStacksNetwork(),
    postConditionMode: PostConditionMode.Deny,
    postConditions: [], // Add post-conditions for security
    onFinish: (data) => {
      console.log('Campaign created:', data.txId);
      return data;
    },
    onCancel: () => {
      console.log('Transaction cancelled by user');
    }
  };

  return openContractCall(txOptions);
}

/**
 * Fund a campaign with STX
 * @param {number} campaignId - Campaign ID
 * @param {number} amount - Amount in STX
 * @param {string} userAddress - Backer's address
 */
export async function fundCampaign(campaignId, amount, userAddress) {
  const amountMicroStx = amount * 1000000;
  
  const functionArgs = [
    uintCV(campaignId),
    uintCV(amountMicroStx)
  ];

  // Post-condition: Ensure STX transfer from user to contract
  const postConditions = [
    makeStandardSTXPostCondition(
      userAddress,
      FungibleConditionCode.Equal,
      amountMicroStx
    )
  ];

  const txOptions = {
    contractAddress: import.meta.env.VITE_CONTRACT_DEPLOYER_ADDRESS,
    contractName: 'campaign-core',
    functionName: 'fund-campaign',
    functionArgs,
    network: getStacksNetwork(),
    postConditionMode: PostConditionMode.Deny,
    postConditions,
    onFinish: (data) => {
      console.log('Funding successful:', data.txId);
      return data;
    }
  };

  return openContractCall(txOptions);
}
```

##### `queries.js` - Read-Only Operations

```javascript
/**
 * Fetch campaign details from blockchain
 * @param {number} campaignId - Campaign ID
 * @returns {Promise<Object>} Campaign data
 */
import { callReadOnlyFunction, cvToJSON } from '@stacks/transactions';

export async function getCampaignDetails(campaignId) {
  const contractAddress = import.meta.env.VITE_CONTRACT_DEPLOYER_ADDRESS;
  const contractName = 'campaign-core';
  
  try {
    const result = await callReadOnlyFunction({
      contractAddress,
      contractName,
      functionName: 'get-campaign',
      functionArgs: [uintCV(campaignId)],
      network: getStacksNetwork(),
      senderAddress: contractAddress
    });

    const jsonResult = cvToJSON(result);
    
    // Parse Clarity response
    if (jsonResult.value && jsonResult.value.value) {
      const campaign = jsonResult.value.value;
      return {
        creator: campaign.creator.value,
        title: campaign.title.value,
        description: campaign.description.value,
        goalAmount: parseInt(campaign['goal-amount'].value) / 1000000,
        raisedAmount: parseInt(campaign['raised-amount'].value) / 1000000,
        deadline: parseInt(campaign.deadline.value),
        status: parseInt(campaign.status.value),
        milestonesEnabled: campaign['milestones-enabled'].value
      };
    }
    
    return null;
  } catch (error) {
    console.error('Error fetching campaign:', error);
    throw error;
  }
}

/**
 * Get all campaigns (paginated via Stacks API)
 * @param {number} limit - Max campaigns per page
 * @param {number} offset - Pagination offset
 */
export async function getAllCampaigns(limit = 20, offset = 0) {
  const network = getStacksNetwork();
  const apiUrl = `${network.coreApiUrl}/extended/v1/contract/${import.meta.env.VITE_CONTRACT_DEPLOYER_ADDRESS}.campaign-core/events`;
  
  const response = await fetch(`${apiUrl}?limit=${limit}&offset=${offset}`);
  const data = await response.json();
  
  // Filter campaign-created events
  const campaignEvents = data.results.filter(
    event => event.contract_log?.value?.repr?.includes('campaign-created')
  );
  
  return campaignEvents.map(parseEventToCampaign);
}
```

##### `transactions.js` - Transaction Monitoring

```javascript
/**
 * Monitor transaction status until confirmed
 * @param {string} txId - Transaction ID
 * @returns {Promise<Object>} Final transaction status
 */
export async function waitForTransaction(txId) {
  const network = getStacksNetwork();
  const apiUrl = `${network.coreApiUrl}/extended/v1/tx/${txId}`;
  
  let attempts = 0;
  const maxAttempts = 60; // 10 minutes max wait
  
  while (attempts < maxAttempts) {
    const response = await fetch(apiUrl);
    const tx = await response.json();
    
    if (tx.tx_status === 'success') {
      return { success: true, data: tx };
    }
    
    if (tx.tx_status === 'abort_by_response' || tx.tx_status === 'abort_by_post_condition') {
      return { success: false, error: tx.tx_result };
    }
    
    // Wait 10 seconds before next check
    await new Promise(resolve => setTimeout(resolve, 10000));
    attempts++;
  }
  
  throw new Error('Transaction confirmation timeout');
}
```

---

#### B. Custom Hooks (`/hooks/`)

##### `useStacksAuth.js`

```javascript
/**
 * Wallet authentication and user session management
 */
import { useEffect } from 'react';
import { useConnect } from '@stacks/connect-react';
import { AppConfig, UserSession, showConnect } from '@stacks/connect';
import { useAuthStore } from '../store/authStore';

export function useStacksAuth() {
  const { userSession, setUserData } = useAuthStore();
  const { doOpenAuth } = useConnect();

  useEffect(() => {
    // Check for existing session on mount
    if (userSession.isUserSignedIn()) {
      const userData = userSession.loadUserData();
      setUserData(userData);
    }
  }, []);

  const connectWallet = () => {
    showConnect({
      appDetails: {
        name: 'FundotStacks',
        icon: window.location.origin + '/logo.svg'
      },
      onFinish: () => {
        const userData = userSession.loadUserData();
        setUserData(userData);
      },
      userSession
    });
  };

  const disconnectWallet = () => {
    userSession.signUserOut();
    setUserData(null);
  };

  return {
    isAuthenticated: userSession.isUserSignedIn(),
    userData: userSession.isUserSignedIn() ? userSession.loadUserData() : null,
    connectWallet,
    disconnectWallet
  };
}
```

##### `useCampaigns.js`

```javascript
/**
 * Campaign data fetching and caching
 */
import { useQuery } from '@tanstack/react-query';
import { getAllCampaigns, getCampaignDetails } from '../api/queries';

export function useCampaigns(filters = {}) {
  return useQuery({
    queryKey: ['campaigns', filters],
    queryFn: () => getAllCampaigns(filters.limit, filters.offset),
    staleTime: 30000, // 30 seconds
    refetchInterval: 60000 // Refresh every minute
  });
}

export function useCampaignDetails(campaignId) {
  return useQuery({
    queryKey: ['campaign', campaignId],
    queryFn: () => getCampaignDetails(campaignId),
    enabled: !!campaignId,
    staleTime: 15000
  });
}
```

##### `useTransaction.js`

```javascript
/**
 * Transaction lifecycle management
 */
import { useState } from 'react';
import { waitForTransaction } from '../api/transactions';

export function useTransaction() {
  const [status, setStatus] = useState('idle'); // idle, pending, confirming, success, error
  const [txId, setTxId] = useState(null);
  const [error, setError] = useState(null);

  const submitTransaction = async (txFunction, ...args) => {
    try {
      setStatus('pending');
      setError(null);
      
      const result = await txFunction(...args);
      setTxId(result.txId);
      setStatus('confirming');
      
      // Wait for confirmation
      const confirmation = await waitForTransaction(result.txId);
      
      if (confirmation.success) {
        setStatus('success');
        return confirmation.data;
      } else {
        throw new Error(confirmation.error);
      }
    } catch (err) {
      setStatus('error');
      setError(err.message);
      throw err;
    }
  };

  const resetTransaction = () => {
    setStatus('idle');
    setTxId(null);
    setError(null);
  };

  return {
    status,
    txId,
    error,
    submitTransaction,
    resetTransaction,
    isLoading: status === 'pending' || status === 'confirming'
  };
}
```

---

#### C. State Management (`/store/`)

##### `authStore.js` - Zustand Store

```javascript
/**
 * Global authentication state
 */
import { create } from 'zustand';
import { AppConfig, UserSession } from '@stacks/connect';

const appConfig = new AppConfig(['store_write', 'publish_data']);
const userSession = new UserSession({ appConfig });

export const useAuthStore = create((set) => ({
  userSession,
  userData: null,
  isAuthenticated: false,

  setUserData: (userData) => set({ 
    userData, 
    isAuthenticated: !!userData 
  }),

  clearUserData: () => set({ 
    userData: null, 
    isAuthenticated: false 
  })
}));
```

##### `campaignStore.js`

```javascript
/**
 * Campaign data caching and management
 */
import { create } from 'zustand';

export const useCampaignStore = create((set, get)
=> ({
  campaigns: [],
  selectedCampaign: null,
  filters: {
    status: 'all',
    sortBy: 'recent'
  },

  setCampaigns: (campaigns) => set({ campaigns }),
  
  selectCampaign: (campaignId) => {
    const campaign = get().campaigns.find(c => c.id === campaignId);
    set({ selectedCampaign: campaign });
  },

  updateCampaignLocally: (campaignId, updates) => set((state) => ({
    campaigns: state.campaigns.map(c => 
      c.id === campaignId ? { ...c, ...updates } : c
    )
  })),

  setFilters: (filters) => set({ filters: { ...get().filters, ...filters } })
}));
```

---

#### D. Key Components

##### `wallet/ConnectButton.jsx`

```javascript
/**
 * Wallet connection button with Stacks Connect
 */
export function ConnectButton() {
  const { isAuthenticated, userData, connectWallet, disconnectWallet } = useStacksAuth();

  if (isAuthenticated) {
    return (
      <div className="flex items-center gap-2">
        <span className="text-sm">
          {userData.profile.stxAddress.mainnet.slice(0, 6)}...
          {userData.profile.stxAddress.mainnet.slice(-4)}
        </span>
        <button
          onClick={disconnectWallet}
          className="px-4 py-2 bg-red-500 text-white rounded-lg"
        >
          Disconnect
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={connectWallet}
      className="px-6 py-3 bg-purple-600 text-white rounded-lg hover:bg-purple-700"
    >
      Connect Wallet
    </button>
  );
}
```

##### `campaign/CampaignForm.jsx`

```javascript
/**
 * Campaign creation form with validation
 */
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const campaignSchema = z.object({
  title: z.string().min(10).max(100),
  description: z.string().min(50).max(500),
  goalAmount: z.number().min(1).max(1000000),
  deadline: z.number().min(144), // Minimum 1 day in blocks
  milestonesEnabled: z.boolean().optional()
});

export function CampaignForm() {
  const { userData } = useAuthStore();
  const { submitTransaction, status } = useTransaction();
  
  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(campaignSchema)
  });

  const onSubmit = async (data) => {
    try {
      await submitTransaction(
        createCampaign, 
        data, 
        userData.profile.stxAddress.mainnet
      );
      
      // Success handling
      toast.success('Campaign created successfully!');
    } catch (error) {
      toast.error('Failed to create campaign');
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <input
        {...register('title')}
        placeholder="Campaign Title"
        className="w-full px-4 py-2 border rounded"
      />
      {errors.title && <p className="text-red-500">{errors.title.message}</p>}
      
      {/* Additional fields... */}
      
      <button
        type="submit"
        disabled={status === 'pending' || status === 'confirming'}
        className="w-full px-6 py-3 bg-green-600 text-white rounded-lg"
      >
        {status === 'confirming' ? 'Confirming...' : 'Create Campaign'}
      </button>
    </form>
  );
}
```

---

## Operational Workflows

### Workflow 1: Campaign Creation

**Actors**: Campaign Creator (authenticated user)

**Steps**:

1. **User Authentication**
   - User clicks "Connect Wallet"
   - `showConnect()` from `@stacks/connect` opens wallet selector
   - User selects Hiro Wallet/Leather/Xverse
   - Wallet prompts for authentication
   - On approval: `UserSession` stores user data
   - Frontend displays user's STX address

2. **Campaign Form Submission**
   - Creator fills campaign form with:
     - Title (10-100 chars)
     - Description (50-500 chars)
     - Goal amount (STX, converted to micro-STX)
     - Deadline (blocks from now, min 144 = ~24 hours)
     - Milestones enabled (optional checkbox)
   - Form validated with Zod schema
   - On submit: `createCampaign()` called

3. **Transaction Construction**
   - `openContractCall()` constructs transaction:
     - Contract: `{deployer}.campaign-core`
     - Function: `create-campaign`
     - Args: [title, description, goal, deadline, milestones]
     - Post-conditions: None (no STX transfer on creation)
   - Wallet popup shows transaction preview
   - User confirms and signs transaction

4. **Blockchain Processing**
   - Transaction broadcasted to Stacks mempool
   - Miner includes TX in next block (typically 10 minutes)
   - Smart contract executes `create-campaign`:
     - Validates inputs
     - Generates unique campaign-id
     - Stores campaign in map
     - Emits `campaign-created` event
   - Transaction marked as `success`

5. **Frontend Update**
   - `waitForTransaction()` polls TX status every 10 seconds
   - On success:
     - Extract campaign-id from event logs
     - Update local campaign cache
     - Redirect to campaign detail page
     - Show success toast notification

**Error Handling**:
- Invalid inputs: Zod catches before TX submission
- User rejection: Catch in `onCancel` callback
- Contract error: Display error from TX result
- Timeout: Prompt user to check wallet/network

---

### Workflow 2: Funding a Campaign

**Actors**: Backer (any authenticated user with STX)

**Steps**:

1. **Campaign Discovery**
   - Backer browses campaigns via `/explore`
   - Frontend fetches campaigns via Stacks API:
     - Queries contract events
     - Filters by status = ACTIVE
     - Sorts by deadline/popularity
   - Displays campaign cards with:
     - Title, creator, goal, progress bar, time remaining

2. **Campaign Details View**
   - User clicks campaign card
   - Navigate to `/campaign/{id}`
   - Fetch full campaign details via `get-campaign()` read-only call
   - Display:
     - Full description
     - Funding progress (raised/goal)
     - Block height countdown to deadline
     - List of milestones (if enabled)
     - Recent backers (from contribution events)

3. **Funding Transaction**
   - User enters funding amount (validates > 0 STX)
   - Clicks "Back This Project"
   - `fundCampaign()` called with post-condition:
     - Requires STX transfer from user to contract address
     - Amount must equal input (prevents front-running)
   - Wallet shows:
     - Amount to transfer
     - Post-condition verification
     - Estimated fee
   - User confirms

4. **Contract Execution**
   - `fund-campaign` function executes:
     - Validates campaign active and not past deadline
     - Calls `stx-transfer?` to move funds to contract
     - Updates `raised-amount` in campaign map
     - Records contribution in contributions map
     - Checks if `raised-amount >= goal-amount`:
       - If yes: Set status to FUNDED
       - Emit `campaign-funded` event
     - Emit `funding-received` event

5. **Post-Funding Actions**
   - Frontend monitors transaction
   - On success:
     - Update campaign progress bar (optimistic + confirmed)
     - Display backer's contribution in "My Contributions" section
     - If campaign just reached goal:
       - Show celebration animation
       - Notify creator via email (off-chain service)
   - Optional: Call `mint-backer-nft()` to issue proof-of-support NFT

**Edge Cases**:
- Over-funding: Allow contributions even after goal met (stretch goals)
- Deadline passed: Contract rejects transaction, refund path triggered
- Insufficient STX: Wallet prevents TX construction

---

### Workflow 3: Campaign Finalization & Fund Release

**Actors**: Campaign Creator

**Scenarios**:

#### Scenario A: Simple Campaign (No Milestones)

1. **Goal Reached**
   - Campaign status automatically changed to FUNDED when goal met
   - Creator receives notification (off-chain)

2. **Finalization**
   - Creator navigates to dashboard
   - Clicks "Finalize Campaign" button
   - `finalize-campaign()` called:
     - Contract validates:
       - Status = FUNDED
       - Caller = creator
     - Transfers all raised funds to creator address
     - Sets status to COMPLETED
   - Funds appear in creator's wallet immediately

#### Scenario B: Milestone-Based Campaign

1. **Milestone Creation** (during campaign setup)
   - Creator defines milestones:
     - Milestone 1: "Prototype Complete" - 30% of funds
     - Milestone 2: "Beta Testing" - 40% of funds
     - Milestone 3: "Launch" - 30% of funds
   - Stored via `add-milestone()` calls

2. **Campaign Funded**
   - Once goal reached, status = FUNDED
   - Funds held in contract, not released yet

3. **Milestone Completion Loop**
   - Creator completes work for Milestone 1
   - Submits proof (off-chain: upload images, reports to IPFS)
   - Requests verification:
     - If verification-required = true:
       - Platform admin or community verifier reviews proof
       - Calls `verify-milestone(campaign-id, 1, approved: true)`
     - If verification not required:
       - Creator can self-verify
   - On verification success:
     - Creator calls `release-milestone-funds(campaign-id, 1)`
     - Contract transfers 30% of raised amount to creator
     - Marks milestone as released
   - Repeat for Milestones 2 & 3

4. **Full Completion**
   - After all milestones released:
     - Contract sets status to COMPLETED
     - Campaign closes

**Verifier Role**:
- Could be platform admins initially
- Future: DAO governance or reputation-based community verifiers
- Incentivized with small fee (e.g., 1% of milestone amount)

---

### Workflow 4: Refund Processing

**Triggers**:
- Campaign deadline passed without reaching goal
- Creator cancels campaign before deadline (voluntary)

**Steps**:

1. **Campaign Failure Detection**
   - Frontend monitors campaigns approaching deadline
   - If `block-height > deadline` AND `status == ACTIVE`:
     - Display "Campaign Failed" badge
     - Allow creator or any user to call `cancel-campaign()`

2. **Cancellation**
   - `cancel-campaign()` function:
     - Validates conditions (deadline passed OR goal not met)
     - Sets status to CANCELLED
     - Calls `refund-handler` contract

3. **Refund Processing**
   - `refund-handler.process-refund()` callable by:
     - Individual backers (pull refunds)
     - Creator/admin (push refunds via batch)
   
   **Pull Model** (recommended):
   - Backer visits campaign page
   - Sees "Claim Refund" button
   - Clicks button
   - Transaction calls `process-refund(campaign-id, backer-address)`
   - Contract transfers original contribution back to backer
   - Marks refund as processed in map

   **Push Model** (gas-intensive):
   - Admin calls `batch-process-refunds(campaign-id, [backer1, backer2, ...])`
   - Contract loops through list and transfers to each
   - Useful for campaigns with few backers

4. **Refund Confirmation**
   - STX appears in backer's wallet
   - Campaign page updated: "Refund Processed"
   - Optional: Burn/void backer NFT (if minted)

**Gas Considerations**:
- Pull refunds: Each backer pays their own gas (fairer)
- Push refunds: High gas cost for creator (only for small backer count)

---

### Workflow 5: Campaign Discovery & Search

**Frontend Implementation**:

1. **Data Source**
   - Primary: Stacks API `/extended/v1/contract/{address}.campaign-core/events`
   - Filters:
     - Event type: `campaign-created`, `funding-received`, `campaign-funded`
   - Parse events to reconstruct campaign list

2. **Caching Strategy**
   - Use React Query with:
     - `staleTime: 30s` (balance freshness vs API load)
     - `cacheTime: 5 minutes`
   - Local state in Zustand for instant updates
   - Optimistic updates when user creates/funds campaign

3. **Search & Filter UI**
   - **Status Filter**: Active / Funded / Completed / Cancelled
   - **Category Tags**: Tech, Art, Social, Gaming (off-chain metadata)
   - **Sort Options**:
     - Trending (most recent fundings)
     - Ending Soon (deadline ascending)
     - Most Funded (raised amount descending)
     - Newest (created-at descending)

4. **Pagination**
   - Load 20 campaigns per page
   - Infinite scroll or traditional pagination
   - Use API `offset` parameter

5. **Real-time Updates**
   - WebSocket connection to Stacks node (optional, advanced)
   - Or poll API every 60 seconds for new events
   - Show toast notification: "New campaign created!" with link

---

## Security & Best Practices

### Smart Contract Security

1. **Access Control**
   - Use `tx-sender` to validate caller identity
   - Restrict sensitive functions:
     - `finalize-campaign`: Only creator
     - `release-milestone-funds`: Only creator
     - `verify-milestone`: Only designated verifiers

2. **Reentrancy Protection**
   - Clarity is not vulnerable to reentrancy by design
   - State updates happen before external calls
   - No nested contract calls in fund release

3. **Integer Overflow Prevention**
   - Use checked arithmetic (Clarity's default behavior)
   - Validate input ranges (e.g., goal < max-uint)

4. **Post-Conditions**
   - Always use post-conditions in frontend TX calls
   - Prevents malicious contract upgrades
   - Example: STX transfer post-condition ensures exact amount moved

5. **Emergency Pause**
   - Optional: Add admin-controlled pause mechanism
   - In case of exploit detection, freeze contract
   - Use with caution (centralization risk)

6. **Audit & Testing**
   - 100% test coverage on critical paths with Clarinet
   - Property-based testing for invariants:
     - Sum of all contributions = raised-amount
     - Released milestone funds <= raised-amount
   - Third-party audit before mainnet launch

---

### Frontend Security

1. **Input Validation**
   - Client-side: Zod schema validation
   - Prevent XSS: Sanitize user-generated content (descriptions)
   - No `eval()` or `dangerouslySetInnerHTML`

2. **Wallet Integration**
   - Never request private keys
   - Use `@stacks/connect` only (official Stacks SDK)
   - Validate all transactions in wallet popup before signing

3. **API Security**
   - Use HTTPS for all Stacks API calls
   - Verify API responses (check signatures if available)
   - Rate limiting: Client-side debouncing for queries

4. **Environment Variables**
   - Never commit `.env` files
   - Use Vercel environment variables for production
   - Separate keys for testnet/mainnet

5. **Content Security Policy**
   - Restrict script sources
   - Block inline scripts
   - Example CSP header:
     ```
     Content-Security-Policy: 
       default-src 'self'; 
       script-src 'self' https://cdn.jsdelivr.net; 
       connect-src https://api.mainnet.hiro.so;
     ```

---

## Performance Optimization

### Frontend

1. **Code Splitting**
   - Lazy load routes with React.lazy
   - Split vendor bundles (React, Stacks libs separate)
   - Target: First Contentful Paint < 1.5s

2. **Image Optimization**
   - Use WebP format
   - Lazy load images below fold
   - Responsive images with `srcset`

3. **State Management**
   - Minimize Zustand store updates
   - Use selectors to prevent unnecessary re-renders
   - Memoize expensive computations with `useMemo`

4. **API Caching**
   - React Query handles caching automatically
   - Background refetching for stale data
   - Prefetch campaign details on hover (link prefetching)

---

### Smart Contracts

1. **Gas Optimization**
   - Use map lookups over list iterations
   - Batch operations when possible (e.g., batch refunds)
   - Avoid redundant reads (cache in local vars)

2. **Data Structures**
   - Use efficient Clarity types:
     - `uint` for IDs and amounts
     - `string-ascii` for short text (cheaper than utf8)
     - `principal` for addresses
   - Minimize nested maps (flatten when possible)

3. **Event Emission**
   - Emit events for all state changes (enables indexing)
   - Keep event data minimal (IDs > full objects)

---

## Deployment Guide

### Prerequisites

- Node.js 18+ and npm
- Clarinet CLI installed (`npm install -g @hirosystems/clarinet`)
- Hiro Wallet or Leather extension
- Testnet STX from faucet (https://explorer.hiro.so/sandbox/faucet?chain=testnet)

---

### Smart Contract Deployment

1. **Local Development**
   ```bash
   cd contracts
   clarinet integrate  # Starts local devnet
   clarinet test       # Runs all tests
   ```

2. **Testnet Deployment**
   ```bash
   # Configure deployment account in Clarinet.toml
   [accounts.deployer]
   mnemonic = "your 24-word seed phrase"
   
   # Deploy to testnet
   clarinet deploy --testnet
   
   # Note deployed contract addresses
   # Example output:
   # ✓ campaign-core deployed at ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM.campaign-core
   ```

3. **Mainnet Deployment**
   - Use hardware wallet for deployer account
   - Audit all contracts
   - Deploy with `clarinet deploy --mainnet`
   - Verify on Explorer: https://explorer.hiro.so

---

### Frontend Deployment

1. **Environment Setup**
   ```bash
   cd frontend
   cp .env.example .env
   
   # Edit .env:
   VITE_STACKS_NETWORK=testnet  # or mainnet
   VITE_CONTRACT_DEPLOYER_ADDRESS=ST1PQHQKV0RJXZFY1DGX8MNSNYVE3VGZJSRTPGZGM
   VITE_CAMPAIGN_CORE_CONTRACT=campaign-core
   VITE_MILESTONE_MANAGER_CONTRACT=milestone-manager
   ```

2. **Build & Deploy to Vercel**
   ```bash
   npm install
   npm run build
   
   # Deploy to Vercel
   vercel --prod
   
   # Or connect GitHub repo for automatic deployments
   ```

3. **Post-Deployment Verification**
   - Test wallet connection on production URL
   - Create a test campaign
   - Verify transactions on Explorer
   - Check all API endpoints responsive

---

## Testing Strategy

### Smart Contract Tests (Clarinet)

**Coverage Requirements**: 100% on critical functions

```typescript
// Example test: campaign-core_test.ts
import { Cl } from "@stacks/transactions";

Clarinet.test({
  name: "Can create campaign with valid inputs",
  async fn(chain, accounts) {
    const creator = accounts.get("wallet_1");
    
    const block = chain.mineBlock([
      Tx.contractCall(
        "campaign-core",
        "create-campaign",
        [
          Cl.stringAscii("Test Campaign"),
          Cl.stringUtf8("A test campaign description"),
          Cl.uint(5000000000), // 5000 STX goal
          Cl.uint(chain.blockHeight + 1000),
          Cl.bool(false)
        ],
        creator.address
      )
    ]);
    
    block.receipts[0].result.expectOk().expectUint(1); // First campaign ID
  }
});

Clarinet.test({
  name: "Cannot create campaign with goal > max limit",
  async fn(chain, accounts) {
    const creator = accounts.get("wallet_1");
    
    const block = chain.mineBlock([
      Tx.contractCall(
        "campaign-core",
        "create-campaign",
        [
          Cl.stringAscii("Invalid Campaign"),
          Cl.stringUtf8("Should fail"),
          Cl.uint(1000000000000000), // Exceeds max
          Cl.uint(chain.blockHeight + 1000),
          Cl.bool(false)
        ],
        creator.address
      )
    ]);
    
    block.receipts[0].result.expectErr(); // Should fail
  }
});
```

---

### Frontend Tests (Jest + React Testing Library)

**Coverage Target**: 90%

```javascript
// Example: CampaignCard.test.jsx
import { render, screen } from '@testing-library/react';
import { CampaignCard } from '../components/campaign/CampaignCard';

describe('CampaignCard', () => {
  const mockCampaign = {
    id: 1,
    title: 'Test Campaign',
    goalAmount: 1000,
    raisedAmount: 500,
    deadline: 1000000,
    status: 1 // ACTIVE
  };

  it('renders campaign details correctly', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    
    expect(screen.getByText('Test Campaign')).toBeInTheDocument();
    expect(screen.getByText('50%')).toBeInTheDocument(); // Progress
  });

  it('shows correct funding status', () => {
    render(<CampaignCard campaign={mockCampaign} />);
    
    expect(screen.getByText('500 / 1000 STX')).toBeInTheDocument();
  });
});
```

---

### Integration Tests

**End-to-End Workflow**:
1. Connect wallet (mocked)
2. Create campaign
3. Fund campaign
4. Verify transaction confirmed
5. Check campaign status updated

Use Playwright for full browser automation:
```javascript
// e2e/create-campaign.spec.js
test('full campaign creation flow', async ({ page }) => {
  await page.goto('http://localhost:5173');
  
  // Mock wallet connection
  await page.evaluate(() => {
    window.mockStacksAuth = true;
  });
  
  await page.click('button:has-text("Connect Wallet")');
  await page.click('a:has-text("Create Campaign")');
  
  await page.fill('input[name="title"]', 'E2E Test Campaign');
  await page.fill('textarea[name="description"]', 'This is a test campaign created by automated test');
  await page.fill('input[name="goalAmount"]', '100');
  
  await page.click('button:has-text("Create Campaign")');
  
  // Wait for transaction confirmation
  await page.waitForSelector('text=Campaign created successfully', { timeout: 120000 });
});
```

---

## Monitoring & Analytics

### Blockchain Monitoring

1. **Transaction Success Rate**
   - Track ratio of successful vs failed TXs
   - Alert if failure rate > 5%

2. **Gas Costs**
   - Monitor average gas per operation
   - Optimize contracts if costs spike

3. **Contract Events**
   - Index all events in database (optional)
   - Dashboard showing:
     - Total campaigns created
     - Total funds raised
     - Active vs completed campaigns

---

### Frontend Analytics

1. **User Behavior**
   - Page views per route
   - Wallet connection rate
   - Campaign creation funnel (form start → TX confirmed)

2. **Performance Metrics**
   - Core Web Vitals (LCP, FID, CLS)
   - API response times
   - Bundle size tracking

3. **Error Tracking**
   - Use Sentry for client-side errors
   - Track common error patterns:
     - Transaction rejections
     - API timeouts
     - Wallet connection failures

---

## Future Enhancements

### Phase 2: Advanced Features

1. **Social Features**
   - Campaign comments (stored on Gaia)
   - Backer profiles with contribution history
   - Creator verification badges

2. **Enhanced Milestones**
   - Automatic milestone verification via oracle
   - Voting mechanism for milestone approval (DAO-style)
   - Conditional milestone dependencies

3. **Tokenization**
   - Issue campaign-specific tokens (SIP-010)
   - Token-gated perks for backers
   - Secondary market for campaign tokens

---

### Phase 3: Cross-Chain

1. **Bitcoin Integration**
   - Accept BTC donations via BTC Connect
   - Convert BTC → STX automatically

2. **Multi-Chain Bridges**
   - Accept USDC on Ethereum → bridge to Stacks
   - Expand to Solana/Polygon for wider reach

---

### Phase 4: Enterprise

1. **White-Label Solution**
   - Customizable frontend for brands
   - Private campaign deployment
   - Custom smart contract modules

2. **Compliance**
   - KYC/AML integration (Civic, Sumsub)
   - Accredited investor verification
   - Securities compliance for equity crowdfunding

---

## Summary

| **Aspect**               | **Implementation**                                                                 |
|--------------------------|------------------------------------------------------------------------------------|
| **Smart Contracts**      | Clarity 4 with campaign-core, milestone-manager, refund-handler, nft-rewards       |
| **Blockchain**           | Stacks Mainnet (Bitcoin-secured via Proof of Transfer)                             |
| **Frontend**             | React.js + Vite + TailwindCSS + ShadCN/UI                                          |
| **Wallet Integration**   | @stacks/connect for authentication, @stacks/transactions for TX construction       |
| **State Management**     | Zustand (global state), React Query (data fetching/caching)                        |
| **Data Storage**         | On-chain (campaign state), IPFS/Gaia (media, milestones), no traditional database |
| **Key Innovations**      | Bitcoin-secured crowdfunding, milestone-based releases, automatic refunds, NFTs    |
| **Testing**              | Clarinet (contracts), Jest + RTL (frontend), Playwright (E2E)                      |
| **Deployment**           | Vercel (frontend), Clarinet CLI (contracts), Hiro API (node access)                |
| **Security**             | Post-conditions, input validation, access control, audit-ready                     |

---

**Document Version**: 1.0  
**Last Updated**: December 15, 2025  
**Status**: Production-Ready Architecture  
**Next Steps**: Begin smart contract development with Clarinet, parallel frontend scaffold