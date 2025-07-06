import type { Review, User } from "@/types/review";

// Generate random wallet addresses
const generateWallet = (): string => {
  const chars = "0123456789abcdef";
  let wallet = "0x";
  for (let i = 0; i < 40; i++) {
    wallet += chars[Math.floor(Math.random() * chars.length)];
  }
  return wallet;
};

// Generate random avatar URLs
const generateAvatar = (seed: string): string => {
  return `https://api.dicebear.com/7.x/avataaars/svg?seed=${seed}&backgroundColor=f97316,fb923c,fdba74&clothesColor=262626,3b82f6,059669`;
};

// Mock users with random data
const mockUsers: User[] = [
  {
    id: "1",
    name: "CryptoTrader_Alpha",
    avatar: generateAvatar("user1"),
    wallet: generateWallet(),
    verified: true,
  },
  {
    id: "2",
    name: "DeFiMaster2024",
    avatar: generateAvatar("user2"),
    wallet: generateWallet(),
    verified: false,
  },
  {
    id: "3",
    name: "BlockchainDev",
    avatar: generateAvatar("user3"),
    wallet: generateWallet(),
    verified: true,
  },
  {
    id: "4",
    name: "SmartContractGuru",
    avatar: generateAvatar("user4"),
    wallet: generateWallet(),
    verified: true,
  },
  {
    id: "5",
    name: "NFTCollector",
    avatar: generateAvatar("user5"),
    wallet: generateWallet(),
    verified: false,
  },
  {
    id: "6",
    name: "Web3Builder",
    avatar: generateAvatar("user6"),
    wallet: generateWallet(),
    verified: true,
  },
  {
    id: "7",
    name: "YieldFarmer",
    avatar: generateAvatar("user7"),
    wallet: generateWallet(),
    verified: false,
  },
  {
    id: "8",
    name: "LiquidityProvider",
    avatar: generateAvatar("user8"),
    wallet: generateWallet(),
    verified: true,
  },
];

// Mock reviews for different agents
export const mockReviews: Review[] = [
  // Agent 1 - Smart Contract Analyzer
  {
    id: "r1",
    user: mockUsers[0],
    rating: 5,
    comment:
      "Incredible tool! Found 3 critical vulnerabilities in my contract that I completely missed. The gas optimization suggestions saved me over 30% on deployment costs. Highly recommended!",
    date: "2024-12-15",
    helpful: 24,
    agentId: 1,
  },
  {
    id: "r2",
    user: mockUsers[1],
    rating: 4,
    comment:
      "Really solid analysis. The vulnerability detection is top-notch, though I wish it had more detailed explanations for some of the findings. Still worth every penny.",
    date: "2024-12-10",
    helpful: 18,
    agentId: 1,
  },
  {
    id: "r3",
    user: mockUsers[2],
    rating: 5,
    comment:
      "As a smart contract developer, this has become an essential part of my workflow. The security analysis is comprehensive and the optimization suggestions are spot-on.",
    date: "2024-12-08",
    helpful: 31,
    agentId: 1,
  },
  {
    id: "r4",
    user: mockUsers[3],
    rating: 4,
    comment:
      "Great for catching common vulnerabilities. The interface is clean and the reports are well-formatted. Could use more advanced pattern detection.",
    date: "2024-12-05",
    helpful: 12,
    agentId: 1,
  },

  // Agent 2 - DeFi Portfolio Manager
  {
    id: "r5",
    user: mockUsers[4],
    rating: 5,
    comment:
      "This agent completely transformed my DeFi strategy! Auto-rebalancing across chains saved me hours of manual work and increased my yields by 15%. Amazing!",
    date: "2024-12-14",
    helpful: 42,
    agentId: 2,
  },
  {
    id: "r6",
    user: mockUsers[5],
    rating: 4,
    comment:
      "Excellent portfolio management features. The yield farming optimization is particularly impressive. Sometimes the cross-chain transactions take longer than expected.",
    date: "2024-12-12",
    helpful: 28,
    agentId: 2,
  },
  {
    id: "r7",
    user: mockUsers[6],
    rating: 5,
    comment:
      "Best DeFi tool I've used! The impermanent loss protection actually works and the automated strategies are sophisticated. Worth the monthly fee.",
    date: "2024-12-09",
    helpful: 35,
    agentId: 2,
  },

  // Agent 3 - NFT Market Analyzer
  {
    id: "r8",
    user: mockUsers[7],
    rating: 4,
    comment:
      "Solid NFT analytics. The rarity scoring helped me identify undervalued pieces before they pumped. The whale tracking feature is a game-changer for timing entries.",
    date: "2024-12-13",
    helpful: 19,
    agentId: 3,
  },
  {
    id: "r9",
    user: mockUsers[0],
    rating: 4,
    comment:
      "Good for market analysis and trend identification. The price prediction models are surprisingly accurate. Interface could be more intuitive though.",
    date: "2024-12-07",
    helpful: 16,
    agentId: 3,
  },

  // Agent 4 - Crypto Trading Assistant
  {
    id: "r10",
    user: mockUsers[1],
    rating: 5,
    comment:
      "This trading assistant is phenomenal! The signals are accurate and the risk management features prevented me from major losses during the last crash. Highly profitable!",
    date: "2024-12-16",
    helpful: 56,
    agentId: 4,
  },
  {
    id: "r11",
    user: mockUsers[2],
    rating: 5,
    comment:
      "Professional-grade trading tools. The technical analysis is spot-on and the automated strategies have consistently outperformed my manual trading. Worth every cent!",
    date: "2024-12-11",
    helpful: 43,
    agentId: 4,
  },
  {
    id: "r12",
    user: mockUsers[3],
    rating: 4,
    comment:
      "Great for both spot and futures trading. The exchange integrations work flawlessly. Could use more customization options for advanced traders.",
    date: "2024-12-06",
    helpful: 21,
    agentId: 4,
  },
];

// Function to get reviews for a specific agent
export const getReviewsForAgent = (agentId: number): Review[] => {
  return mockReviews.filter((review) => review.agentId === agentId);
};

// Function to get average rating for an agent
export const getAverageRating = (agentId: number): number => {
  const reviews = getReviewsForAgent(agentId);
  if (reviews.length === 0) return 0;

  const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0);
  return Math.round((totalRating / reviews.length) * 10) / 10;
};

// Function to get total review count for an agent
export const getReviewCount = (agentId: number): number => {
  return getReviewsForAgent(agentId).length;
};
