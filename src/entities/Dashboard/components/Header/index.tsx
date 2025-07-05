import { ConnectWalletButton } from "@/components/ions/connect-wallet-button";
import { LanguageSelector } from "@/components/ions/language-selector";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { PlusIcon } from "lucide-react";
import { CreateAgentForm } from "../Forms/CreateAgentForm";

export function Header() {
  const handleCreateAgent = (data: {
    image: string;
    name: string;
    description: string;
    type: string;
    price: string;
    url: string;
    toolcalls: string;
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
            <div className="w-8 h-8 sm:w-10 sm:h-10 lg:w-12 lg:h-12 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center">
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
            <Dialog>
              <DialogTrigger asChild>
                <button
                  className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 
                  text-white rounded-xl shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40
                  p-2 sm:px-4 sm:py-2.5 lg:px-5 lg:py-3 
                  flex items-center space-x-1 sm:space-x-2 
                  transition-all duration-200 ease-out transform hover:scale-105 active:scale-95
                  focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-white"
                  aria-label="Create new agent"
                >
                  <PlusIcon
                    className="w-4 h-4 sm:w-5 sm:h-5"
                    strokeWidth={2.5}
                  />
                  <span className="hidden sm:inline text-sm lg:text-base font-semibold">
                    Create Agent
                  </span>
                </button>
              </DialogTrigger>
              <DialogContent className="w-[95vw] max-w-lg mx-auto max-h-[90vh] p-0 m-4 bg-white border border-orange-100 shadow-2xl shadow-orange-500/10">
                <DialogHeader className="p-4 sm:p-6 pb-2 sm:pb-4 bg-gradient-to-r from-orange-50 to-orange-50/50 border-b border-orange-100">
                  <DialogTitle className="text-lg sm:text-xl font-bold text-gray-900">
                    Create New Agent
                  </DialogTitle>
                  <p className="text-sm text-gray-600 mt-1">
                    Fill in the details to create your AI agent
                  </p>
                </DialogHeader>
                <div className="px-4 pb-4 sm:px-6 sm:pb-6 max-h-[60vh] sm:max-h-[70vh] overflow-y-auto custom-scrollbar">
                  <CreateAgentForm onSubmit={handleCreateAgent} />
                </div>
              </DialogContent>
            </Dialog>
          </div>
        </div>
      </div>
    </header>
  );
}
