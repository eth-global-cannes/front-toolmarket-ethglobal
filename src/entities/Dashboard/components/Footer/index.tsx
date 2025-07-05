import { LanguageSelector } from "@/components/ions/language-selector";

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* Main Footer Content */}
      <div className="px-4 py-12 sm:px-6 sm:py-16 lg:px-8 lg:py-20 max-w-7xl mx-auto">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 lg:gap-12">
          {/* Brand Section - Enhanced */}
          <div className="space-y-4 sm:space-y-6">
            <div className="flex items-center space-x-3">
              <div className="w-10 h-10 bg-gradient-to-br from-orange-500 to-orange-600 rounded-xl shadow-lg shadow-orange-500/25 flex items-center justify-center">
                <img
                  src="/logo.png"
                  alt="ToolMarket Logo"
                  className="w-8 h-8"
                />
              </div>
              <div>
                <h3 className="text-xl font-bold bg-gradient-to-r from-orange-400 to-orange-500 bg-clip-text text-transparent">
                  ToolMarket
                </h3>
                <p className="text-xs text-gray-400 font-medium">
                  AI Agent Marketplace
                </p>
              </div>
            </div>
            <p className="text-sm text-gray-300 leading-relaxed">
              The premier marketplace for AI agents. Discover, deploy, and
              monetize intelligent automation solutions.
            </p>
            <div className="pt-2">
              <LanguageSelector />
            </div>
          </div>

          {/* Quick Links - Enhanced */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg font-bold text-white">Quick Links</h4>
            <ul className="space-y-3">
              {[
                "See my orders",
                "Browse Agents",
                "Create Agent",
                "Marketplace",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal - Enhanced */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg font-bold text-white">Legal</h4>
            <ul className="space-y-3">
              {[
                "Privacy Policy",
                "Terms of Use",
                "Cookie Policy",
                "GDPR Compliance",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Support - Enhanced */}
          <div className="space-y-4 sm:space-y-6">
            <h4 className="text-lg font-bold text-white">Support</h4>
            <ul className="space-y-3">
              {[
                "Help Center",
                "Contact Us",
                "API Documentation",
                "Community Forum",
              ].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    className="text-sm text-gray-300 hover:text-orange-400 transition-colors duration-200 flex items-center group"
                  >
                    <span className="w-1.5 h-1.5 bg-orange-500 rounded-full mr-3 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></span>
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* Enhanced Divider */}
      <div className="border-t border-gray-700/50 bg-gradient-to-r from-transparent via-gray-700/30 to-transparent"></div>

      {/* Bottom Section - Enhanced */}
      <div className="px-4 py-6 sm:px-6 sm:py-8 lg:px-8 max-w-7xl mx-auto">
        <div className="flex flex-col sm:flex-row items-center justify-between space-y-4 sm:space-y-0">
          {/* Disclaimer - Enhanced */}
          <div className="text-center sm:text-left">
            <p className="text-xs text-gray-400 leading-relaxed max-w-md">
              ToolMarket is not affiliated with Facebook, Inc. or Meta
              Platforms, Inc. We are an independent AI agent marketplace
              platform.
            </p>
          </div>

          {/* Copyright & Powered by - Enhanced */}
          <div className="flex flex-col sm:flex-row items-center space-y-2 sm:space-y-0 sm:space-x-4 text-center sm:text-right">
            <p className="text-xs text-gray-400">
              © {currentYear} ToolMarket. All rights reserved.
            </p>
            <div className="flex items-center space-x-2 px-3 py-1.5 bg-gradient-to-r from-purple-500/10 to-purple-600/10 rounded-full border border-purple-500/20">
              <div className="w-2 h-2 bg-purple-600 rounded-full animate-pulse"></div>
              <span className="text-xs text-purple-600 font-medium">
                Powered by Retix
              </span>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
