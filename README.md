# FundotStacks

![FundotStacks Logo](https://img.shields.io/badge/Built%20on-Stacks-5546FF?style=for-the-badge)
![Bitcoin Secured](https://img.shields.io/badge/Secured%20by-Bitcoin-F7931A?style=for-the-badge)

## 🚀 Overview

**FundotStacks** is a decentralized crowdfunding platform built on the Stacks blockchain, enabling creators to launch campaigns and receive funding in STX tokens through trustless smart contracts. All transactions are secured by Bitcoin's Proof of Work through Stacks' Proof of Transfer consensus.

### Key Features

- ✅ **Bitcoin-Secured**: All transactions anchored to Bitcoin for maximum security
- 🎯 **Smart Contract Automation**: Trustless fund management with Clarity contracts
- 📊 **Milestone-Based Funding**: Release funds in stages as you hit project milestones
- 💰 **Zero Platform Fees**: No middleman, only blockchain transaction costs
- 🔄 **Automatic Refunds**: Failed campaigns automatically trigger refunds to backers
- 🎨 **NFT Rewards**: Backers receive proof-of-support NFTs

## 🏗️ Architecture

### Smart Contracts (Clarity 4)

- **campaign-core.clar**: Main campaign lifecycle management
- **milestone-manager.clar**: Milestone-based fund releases
- **refund-handler.clar**: Automatic refund processing
- **nft-rewards.clar**: SIP-009 NFT rewards for backers

### Frontend (React + Vite)

- **Framework**: React 18 with Vite
- **Styling**: TailwindCSS with custom orange theme + dark mode
- **State Management**: Zustand + React Query
- **Blockchain Integration**: @stacks/connect, @stacks/transactions

## 🛠️ Quick Start

```bash
# Install dependencies (frontend)
cd frontend && npm install

# Start development server
npm run dev

# Check smart contracts
clarinet check
```

## 📖 Documentation

See [architecture.md](./architecture.md) for complete technical documentation.

---

**Built on Stacks, secured by Bitcoin**
