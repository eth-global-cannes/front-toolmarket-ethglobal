import { SkipLink } from "@/components/ui/skip-link";
import { Header } from "@/entities/Dashboard/components/Header";
import { Search } from "@/entities/Dashboard/components/Search";
import { TabsWithBookmarks } from "@/entities/Dashboard/components/TabsWithBookmarks";
import type { Agent } from "@/types/agent";
import { bookmarkToAgent, getBookmarkedAgents } from "@/utils/bookmarks";
import { ComponentLoader, LazyFooter } from "@/utils/lazy-loading";
import { useNavigate } from "@tanstack/react-router";
import { Suspense, useEffect, useState } from "react";

interface MarketplaceViewProps {
  paidAgents: Agent[];
  otherAgents: Agent[];
  onAgentClick: (agent: Agent) => void;
  onSearch: (value: string) => void;
}

export function MarketplaceView({
  paidAgents,
  otherAgents,
  onSearch,
}: MarketplaceViewProps) {
  const [bookmarkedAgents, setBookmarkedAgents] = useState<Agent[]>([]);
  const navigate = useNavigate();

  // Load bookmarked agents from localStorage
  useEffect(() => {
    const bookmarks = getBookmarkedAgents();
    const agents = bookmarks.map(bookmarkToAgent);
    setBookmarkedAgents(agents);
  }, []);

  // Listen for bookmark changes (when returning from detail view)
  useEffect(() => {
    const handleFocus = () => {
      const bookmarks = getBookmarkedAgents();
      const agents = bookmarks.map(bookmarkToAgent);
      setBookmarkedAgents(agents);
    };

    window.addEventListener("focus", handleFocus);
    return () => window.removeEventListener("focus", handleFocus);
  }, []);

  const onAgentClick = () => {
    alert("clicked");
    navigate({
      to: "/agents/$agent",
      params: { agent: "3" },
    });
  };

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-orange-50 via-white to-orange-50/30">
      {/* Skip Link for Accessibility */}
      <SkipLink />

      {/* Header */}
      <Header />

      {/* Main Content - Enhanced Background */}
      <main id="main-content" className="flex-1 relative" role="main">
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
              <Search onSearch={onSearch} />
            </div>
          </section>

          {/* Tabs Section - Enhanced Container */}
          <section className="bg-white/60 backdrop-blur-sm rounded-2xl border border-orange-100/50 shadow-lg shadow-orange-500/5 p-6 sm:p-8 lg:p-10">
            <TabsWithBookmarks
              paidAgents={paidAgents}
              otherAgents={otherAgents}
              bookmarkedAgents={bookmarkedAgents}
              onAgentClick={onAgentClick}
            />
          </section>
        </div>
      </main>

      {/* Footer */}
      <Suspense fallback={<ComponentLoader className="h-64" />}>
        <LazyFooter />
      </Suspense>
    </div>
  );
}
