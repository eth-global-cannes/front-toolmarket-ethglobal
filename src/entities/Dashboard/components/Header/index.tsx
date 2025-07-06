import { ConnectWalletButton } from "@/components/ions/connect-wallet-button";
import { CreateAgentButton } from "@/components/ions/create-agent-button";
import { LanguageSelector } from "@/components/ions/language-selector";
import { useState } from "react";

export function Header() {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleCreateAgent = (data: {
    image: string;
    name: string;
    description: string;
    type: string;
    price: string;
    url: string;
    endpoints: Array<{
      id: string;
      endpoint: string;
      apiParams: Array<{
        id: string;
        key: string;
        value: string;
        type: "string" | "number" | "boolean";
      }>;
    }>;
  }) => {
    console.log("Creating agent:", data);
    // Implement agent creation logic here
  };

  return (
    <header className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <div className="flex items-center justify-between h-16 sm:h-20">
          {/* Logo Section - Enhanced */}
          <div className="flex items-center flex-shrink-0">
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 border-2 border-orange-500 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center">
              <img
                src="/logo.png"
                alt="ToolMarket Logo"
                className="w-6 h-6 sm:w-8 sm:h-8 lg:w-10 lg:h-10"
              />
            </div>
            <div className="ml-2 sm:ml-3">
              <h1 className="text-lg sm:text-xl lg:text-2xl font-bold bg-gradient-to-r from-orange-600 to-orange-500 bg-clip-text text-transparent">
                ToolMarket
              </h1>
              <p className="hidden sm:block text-xs text-gray-500 font-medium">
                AI Agent Marketplace
              </p>
            </div>
          </div>

          {/* Actions Section - Enhanced */}
          <div className="flex items-center space-x-2 sm:space-x-3 lg:space-x-4">
            {/* Language Selector - Enhanced for larger screens */}
            <div className="hidden sm:block">
              <LanguageSelector />
            </div>

            {/* Wallet Connection */}
            <ConnectWalletButton />

            {/* Create Agent Button - Enhanced */}
            <CreateAgentButton handleCreateAgent={handleCreateAgent} />
          </div>
        </div>
      </div>
    </header>
  );
}
