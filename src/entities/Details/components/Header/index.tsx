import { ArrowLeft } from "lucide-react";

interface HeaderProps {
  onBack: () => void;
}

export function Header({ onBack }: HeaderProps) {
  return (
    <div className="sticky top-0 z-50 bg-white/95 backdrop-blur-md border-b border-orange-100 shadow-sm">
      <div className="px-4 py-3 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        <button
          onClick={onBack}
          className="flex items-center space-x-2 text-gray-600 hover:text-orange-600 transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 rounded-lg px-2 py-1"
        >
          <ArrowLeft className="w-5 h-5" />
          <span className="font-medium">Back to Marketplace</span>
        </button>
      </div>
    </div>
  );
}
