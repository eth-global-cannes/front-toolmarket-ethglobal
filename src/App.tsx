import { Header } from "@/entities/Dashboard/components/Header";
import { Search } from "@/entities/Dashboard/components/Search";
import { Tabs } from "@/entities/Dashboard/components/Tabs";
import { Footer } from "@/entities/Dashboard/components/Footer";

// Sample data for agents
const paidAgents = [
  {
    id: 1,
    image: "https://placehold.co/400x300/png?text=AI+Agent+1",
    title: "Smart Contract Analyzer",
    description:
      "Analyzes smart contracts for security vulnerabilities and optimization opportunities.",
    rating: 4.5,
    votes: 128,
  },
  {
    id: 2,
    image: "https://placehold.co/400x300/png?text=AI+Agent+2",
    title: "DeFi Portfolio Manager",
    description:
      "Manages and optimizes DeFi portfolios across multiple chains.",
    rating: 5,
    votes: 256,
  },
  {
    id: 3,
    image: "https://placehold.co/400x300/png?text=AI+Agent+3",
    title: "NFT Market Analyzer",
    description: "Provides insights and predictions for NFT markets.",
    rating: 4,
    votes: 89,
  },
  {
    id: 4,
    image: "https://placehold.co/400x300/png?text=AI+Agent+4",
    title: "Crypto Trading Assistant",
    description: "AI-powered trading signals and market analysis.",
    rating: 4.8,
    votes: 312,
  },
];

const otherAgents = [
  {
    id: 5,
    image: "https://placehold.co/400x300/png?text=Free+Agent+1",
    title: "Gas Fee Calculator",
    description: "Estimates gas fees across different networks.",
    rating: 4.2,
    votes: 156,
  },
  {
    id: 6,
    image: "https://placehold.co/400x300/png?text=Free+Agent+2",
    title: "Wallet Tracker",
    description: "Tracks wallet activities and provides notifications.",
    rating: 4.6,
    votes: 203,
  },
  {
    id: 7,
    image: "https://placehold.co/400x300/png?text=Free+Agent+3",
    title: "Token Scanner",
    description: "Scans new tokens for potential risks and opportunities.",
    rating: 4.3,
    votes: 167,
  },
  {
    id: 8,
    image: "https://placehold.co/400x300/png?text=Free+Agent+4",
    title: "Blockchain Explorer",
    description: "User-friendly interface for exploring blockchain data.",
    rating: 4.7,
    votes: 289,
  },
];

export const App = () => {
  const handleSearch = (value: string) => {
    console.log("Searching for:", value);
    // Implement search logic here
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      {/* Header */}
      <Header />

      {/* Main Content - Enhanced Background */}
      <main className="flex-1 relative">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(249,115,22,0.1)_1px,_transparent_0)] bg-[length:24px_24px] opacity-30"></div>

        <div className="relative px-4 py-6 sm:px-6 sm:py-8 lg:px-8 lg:py-12 max-w-7xl mx-auto">
          {/* Search Section - Enhanced */}
          <section className="mb-8 sm:mb-12">
            <div className="max-w-2xl mx-auto">
              <div className="text-center mb-6 sm:mb-8">
                <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 sm:mb-4">
                  Discover AI Agents
                </h1>
                <p className="text-base sm:text-lg text-gray-600 leading-relaxed">
                  Find the perfect AI agent for your needs. From smart contracts
                  to DeFi management.
                </p>
              </div>
              <Search onSearch={handleSearch} />
            </div>
          </section>

          {/* Tabs Section - Enhanced Container */}
          <section className="bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-100/50 shadow-lg shadow-orange-500/5 p-6 sm:p-8 lg:p-10">
            <Tabs paidAgents={paidAgents} otherAgents={otherAgents} />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
};
