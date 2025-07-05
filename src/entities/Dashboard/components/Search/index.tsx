import { Search as SearchIcon } from "lucide-react";
import { useState } from "react";

interface SearchProps {
  onSearch: (value: string) => void;
}

export function Search({ onSearch }: SearchProps) {
  const [searchValue, setSearchValue] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch(searchValue);
  };

  return (
    <form onSubmit={handleSubmit} className="w-full">
      <div className="relative group">
        {/* Search Icon */}
        <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none z-10">
          <SearchIcon className="w-5 h-5 text-gray-400 group-focus-within:text-orange-500 transition-colors duration-200" />
        </div>

        {/* Search Input */}
        <input
          type="text"
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          placeholder="Search for AI agents, smart contracts, DeFi tools..."
          className="w-full pl-12 pr-4 py-3 sm:py-4 lg:py-5
          text-sm sm:text-base lg:text-lg
          bg-white/80 backdrop-blur-sm border border-orange-100 
          rounded-2xl shadow-lg shadow-orange-500/5
          placeholder:text-gray-400 text-gray-900
          focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-transparent
          focus:border-orange-300 focus:bg-white focus:shadow-xl focus:shadow-orange-500/10
          hover:border-orange-200 hover:shadow-xl hover:shadow-orange-500/8
          transition-all duration-200 ease-out"
          aria-label="Search for AI agents"
        />

        {/* Gradient border effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-orange-500/20 to-orange-600/20 opacity-0 group-focus-within:opacity-100 transition-opacity duration-200 pointer-events-none -z-10 blur-sm"></div>

        {/* Search Button - Hidden but accessible */}
        <button type="submit" className="sr-only" aria-label="Submit search">
          Search
        </button>
      </div>

      {/* Search suggestions/hints */}
      <div className="mt-3 flex flex-wrap gap-2 justify-center">
        {["Smart Contracts", "DeFi", "NFT Tools", "Trading Bots"].map(
          (suggestion) => (
            <button
              key={suggestion}
              type="button"
              onClick={() => {
                setSearchValue(suggestion);
                onSearch(suggestion);
              }}
              className="px-3 py-1.5 text-xs sm:text-sm text-orange-600 bg-orange-50 hover:bg-orange-100 
            rounded-full border border-orange-200 hover:border-orange-300
            transition-all duration-200 ease-out hover:scale-105 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-1"
            >
              {suggestion}
            </button>
          )
        )}
      </div>
    </form>
  );
}
