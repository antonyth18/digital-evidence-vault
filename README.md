# Sentinel - Digital Evidence Vault

> *"Get it together. The evidence doesn't lie, but people do."* — Harvey Specter, Suits

A blockchain-powered platform for tamper-proof digital evidence management. Because in the legal world, evidence tampering isn't just a TV drama plot—it's a real threat to justice.

## Why Sentinel?

In the hit series **Suits**, countless cases hinge on evidence integrity. Mike Ross and Harvey Specter repeatedly face adversaries who tamper with documents, alter recordings, or fabricate proof. While that makes for great television, the real-world consequences are devastating.

### The Duke Lacrosse Case (2006)

In one of America's most infamous wrongful prosecution cases, three Duke University lacrosse players were falsely accused of sexual assault. The prosecutor, Mike Nifong, **withheld exculpatory DNA evidence** and manipulated witness statements. The players faced a year of public persecution before the case collapsed and Nifong was disbarred.

Had blockchain-verified evidence existed, the DNA results would have been immutably timestamped and any tampering immediately detectable. **Sentinel ensures that never happens again.**

---

## Tech Stack

| Layer | Technology |
|-------|------------|
| **Frontend** | React 18, TypeScript, Vite, Tailwind CSS, Framer Motion |
| **Backend** | Node.js, Express.js, Multer |
| **Blockchain** | Solidity, Hardhat, Ethers.js v6, Ethereum (Sepolia) |
| **Database** | Supabase (PostgreSQL) |
| **Storage** | Supabase Storage |
| **AI/ML** | Hugging Face Transformers, Sharp (image forensics) |
| **Deployment** | Vercel (frontend), Render (backend) |

---

## Project Structure

```
digital-evidence-vault/
├── frontend/                 # React + Vite frontend
│   ├── src/
│   │   ├── components/       # Reusable UI components
│   │   │   ├── ui/           # Primitives (Button, Card, Input, etc.)
│   │   │   ├── layout/       # Layout components (Sidebar, Layout)
│   │   │   └── evidence/     # Evidence-specific components
│   │   ├── pages/            # Route pages (Dashboard, Vault, Upload, etc.)
│   │   ├── context/          # React context providers (Theme)
│   │   ├── utils/            # Utilities (API client, classname helper)
│   │   └── App.tsx           # Main app with routing
│   └── public/               # Static assets (logo, favicon)
│
├── backend/                  # Express.js API server
│   ├── services/
│   │   ├── blockchainService.js    # Ethereum interaction layer
│   │   ├── supabaseService.js      # Database & storage operations
│   │   ├── aiRiskScoring.js        # ML-powered evidence analysis
│   │   ├── tamperLedgerService.js  # Tamper event tracking
│   │   ├── policyEngine.js         # Custody policy enforcement
│   │   └── evidenceStorage.js      # In-memory fallback storage
│   ├── utils/
│   │   └── crypto.js         # SHA-256 hashing utilities
│   ├── scripts/
│   │   └── clearDb.js        # Database cleanup utility
│   └── server.js             # Main Express server
│
├── blockchain/               # Smart contract layer
│   ├── contracts/
│   │   └── EvidenceRegistry.sol    # Main evidence contract
│   ├── scripts/
│   │   ├── deploy.js         # Contract deployment script
│   │   └── fundAccount.js    # Local dev account funding
│   └── hardhat.config.js     # Hardhat configuration
│
└── db_schema.sql             # Supabase database schema
```

---

## Key Features

- **Blockchain Anchoring** - Every evidence hash is recorded on Ethereum
- **Chain of Custody** - All transfers logged as on-chain transactions
- **AI Risk Scoring** - Automatic manipulation detection using ML
- **Tamper Detection** - Real-time verification against blockchain records
- **Audit Trail** - Complete, immutable history of all actions

---

## Quick Start

### Prerequisites
- Node.js 18+
- MetaMask wallet with Sepolia ETH
- Supabase account

### Local Development

```bash
# 1. Clone the repo
git clone https://github.com/antonyth18/digital-evidence-vault-devfest5.0.git
cd digital-evidence-vault-devfest5.0

# 2. Start local blockchain
cd blockchain && npm install && npx hardhat node

# 3. Deploy contracts (new terminal)
cd blockchain && npx hardhat run scripts/deploy.js --network localhost

# 4. Start backend (new terminal)
cd backend && npm install && npm run dev

# 5. Start frontend (new terminal)
cd frontend && npm install && npm run dev
```

Visit `http://localhost:5173/home`

---

## Environment Variables

### Backend (.env)
```env
PORT=3001
BLOCKCHAIN_RPC_URL=https://sepolia.infura.io/v3/YOUR_KEY
CONTRACT_ADDRESS=0x...
PRIVATE_KEY=your_wallet_private_key
NETWORK=sepolia
SUPABASE_URL=https://your-project.supabase.co
SUPABASE_SERVICE_KEY=your_service_key
ENABLE_POLICY_ENGINE=true
ENABLE_AI_SCORING=true
```

### Frontend (.env)
```env
VITE_API_URL=https://your-backend.onrender.com/api
```

---

## Live Demo

- **Frontend**: [https://evidence-vault-devfest50.vercel.app](https://evidence-vault-devfest50.vercel.app)
- **Backend**: [https://evidence-vault-backend.onrender.com](https://evidence-vault-backend.onrender.com)
- **Contract**: [View on Etherscan](https://sepolia.etherscan.io/address/0xeB19Bafd63bDEFA59F39DFeDc8c246ae2806b652)

---

## License

MIT

---

*Built for DevFest 5.0 - Blockchain Track*