import { useState, Suspense } from "react";
import { MarketplaceView } from "@/views/MarketplaceView";
import { LazyAgentDetailsView } from "@/utils/lazy-loading";
import { ComponentLoader } from "@/utils/lazy-loading";
import type { Agent } from "@/types/agent";
import type { ViewType } from "@/types/router";

// Sample data for agents with extended information
const paidAgents: Agent[] = [
  {
    id: 1,
    image: "https://placehold.co/400x300/png?text=AI+Agent+1",
    title: "Smart Contract Analyzer",
    description:
      "Analyzes smart contracts for security vulnerabilities and optimization opportunities.",
    rating: 4.5,
    votes: 128,
    price: "29.99",
    type: "monthly",
    developer: "BlockSec Labs",
    releaseDate: "November 2024",
    category: "Security",
    isPurchased: true,
    longDescription:
      "Our advanced Smart Contract Analyzer uses cutting-edge AI to detect vulnerabilities, gas optimization opportunities, and potential security risks in your smart contracts. With over 1000+ vulnerability patterns in our database, this agent provides comprehensive analysis and detailed reports to help you deploy safer contracts.",
  },
  {
    id: 2,
    image: "https://placehold.co/400x300/png?text=AI+Agent+2",
    title: "DeFi Portfolio Manager",
    description:
      "Manages and optimizes DeFi portfolios across multiple chains.",
    rating: 5,
    votes: 256,
    price: "49.99",
    type: "monthly",
    developer: "DeFi Innovations",
    releaseDate: "December 2024",
    category: "Finance",
    isPurchased: false,
    longDescription:
      "Automatically rebalance your DeFi portfolio across multiple chains with our intelligent portfolio manager. Features include yield farming optimization, impermanent loss protection, and automated compound strategies. Supports Ethereum, Polygon, Arbitrum, and more.",
  },
  {
    id: 3,
    image: "https://placehold.co/400x300/png?text=AI+Agent+3",
    title: "NFT Market Analyzer",
    description: "Provides insights and predictions for NFT markets.",
    rating: 4,
    votes: 89,
    price: "19.99",
    type: "monthly",
    developer: "NFT Analytics Pro",
    releaseDate: "October 2024",
    category: "Analytics",
    isPurchased: true,
    longDescription:
      "Get ahead of NFT trends with our market analyzer that tracks floor prices, trading volumes, and social sentiment across major NFT marketplaces. Features include rarity scoring, price prediction models, and whale wallet tracking.",
  },
  {
    id: 4,
    image: "https://placehold.co/400x300/png?text=AI+Agent+4",
    title: "Crypto Trading Assistant",
    description: "AI-powered trading signals and market analysis.",
    rating: 4.8,
    votes: 312,
    price: "99.99",
    type: "monthly",
    developer: "TradingBot AI",
    releaseDate: "September 2024",
    category: "Trading",
    isPurchased: false,
    longDescription:
      "Professional-grade trading assistant that provides real-time market analysis, trading signals, and risk management tools. Integrates with major exchanges and supports both spot and futures trading with advanced technical indicators.",
  },
];

const otherAgents: Agent[] = [
  {
    id: 5,
    image: "https://placehold.co/400x300/png?text=Free+Agent+1",
    title: "Gas Fee Calculator",
    description: "Estimates gas fees across different networks.",
    rating: 4.2,
    votes: 156,
    price: "0",
    type: "free",
    developer: "Community",
    releaseDate: "August 2024",
    category: "Utility",
    isPurchased: true, // Free agents are considered "purchased"
    longDescription:
      "Free gas fee calculator that provides real-time estimates across Ethereum, Polygon, BSC, and other major networks. Includes historical data and optimal timing suggestions to minimize transaction costs.",
  },
  {
    id: 6,
    image: "https://placehold.co/400x300/png?text=Free+Agent+2",
    title: "Wallet Tracker",
    description: "Tracks wallet activities and provides notifications.",
    rating: 4.6,
    votes: 203,
    price: "0",
    type: "free",
    developer: "OpenSource Dev",
    releaseDate: "July 2024",
    category: "Monitoring",
    isPurchased: true, // Free agents are considered "purchased"
    longDescription:
      "Monitor any wallet address across multiple blockchains with real-time notifications for transactions, token transfers, and balance changes. Perfect for tracking whale movements and portfolio monitoring.",
  },
  {
    id: 7,
    image: "https://placehold.co/400x300/png?text=Free+Agent+3",
    title: "Token Scanner",
    description: "Scans new tokens for potential risks and opportunities.",
    rating: 4.3,
    votes: 167,
    price: "0",
    type: "free",
    developer: "Security Guild",
    releaseDate: "June 2024",
    category: "Security",
    isPurchased: true, // Free agents are considered "purchased"
    longDescription:
      "Automated token scanner that analyzes new token contracts for common vulnerabilities, honeypots, and rug pull indicators. Includes contract verification and liquidity analysis.",
  },
  {
    id: 8,
    image: "https://placehold.co/400x300/png?text=Free+Agent+4",
    title: "Blockchain Explorer",
    description: "User-friendly interface for exploring blockchain data.",
    rating: 4.7,
    votes: 289,
    price: "0",
    type: "free",
    developer: "Explorer Team",
    releaseDate: "May 2024",
    category: "Explorer",
    isPurchased: true, // Free agents are considered "purchased"
    longDescription:
      "Enhanced blockchain explorer with advanced search capabilities, transaction analysis, and smart contract interaction tools. Supports multiple networks with a clean, intuitive interface.",
  },
];

export const App = () => {
  const [currentView, setCurrentView] = useState<ViewType>("marketplace");
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // Implement search logic here
  };

  const handleAgentClick = (agent: Agent) => {
    setSelectedAgent(agent);
    setCurrentView("agent-details");
  };

  const handleBackToMarketplace = () => {
    setSelectedAgent(null);
    setCurrentView("marketplace");
  };

  // Router: Render current view
  const renderCurrentView = () => {
    switch (currentView) {
      case "agent-details":
        if (!selectedAgent) {
          // Fallback to marketplace if no agent selected
          setCurrentView("marketplace");
          return null;
        }
        return (
          <Suspense fallback={<ComponentLoader className="min-h-screen" />}>
            <LazyAgentDetailsView
              agent={selectedAgent}
              onBack={handleBackToMarketplace}
            />
          </Suspense>
        );

      case "marketplace":
      default:
        return (
          <MarketplaceView
            paidAgents={paidAgents}
            otherAgents={otherAgents}
            onAgentClick={handleAgentClick}
            onSearch={handleSearch}
          />
        );
    }
  };

  return renderCurrentView();
};
