import { useState } from "react";
import { Bookmark, CreditCard, Users } from "lucide-react";
import { AgentCard } from "../AgentCard";
import type { Agent } from "@/types/agent";

interface TabsWithBookmarksProps {
  paidAgents: Agent[];
  otherAgents: Agent[];
  bookmarkedAgents: Agent[];
  onAgentClick: (agent: Agent) => void;
}

type TabId = "paid" | "other" | "bookmarks";

interface TabConfig {
  id: TabId;
  label: string;
  count: number;
  agents: Agent[];
  icon: React.ComponentType<{ className?: string }>;
}

export function TabsWithBookmarks({
  paidAgents,
  otherAgents,
  bookmarkedAgents,
  onAgentClick,
}: TabsWithBookmarksProps) {
  const [activeTab, setActiveTab] = useState<TabId>("paid");

  const baseTabs: TabConfig[] = [
    {
      id: "paid",
      label: "Paid Agents",
      count: paidAgents.length,
      agents: paidAgents,
      icon: CreditCard,
    },
    {
      id: "other",
      label: "Other Agents",
      count: otherAgents.length,
      agents: otherAgents,
      icon: Users,
    },
  ];

  // Add bookmarks tab if there are bookmarked agents
  const tabs: TabConfig[] =
    bookmarkedAgents.length > 0
      ? [
          ...baseTabs,
          {
            id: "bookmarks",
            label: "Bookmarked",
            count: bookmarkedAgents.length,
            agents: bookmarkedAgents,
            icon: Bookmark,
          },
        ]
      : baseTabs;

  const activeAgents = tabs.find((tab) => tab.id === activeTab)?.agents || [];

  return (
    <div className="w-full">
      {/* Tab Navigation */}
      <div className="flex flex-wrap gap-2 mb-8 p-2 bg-orange-50/50 rounded-2xl border border-orange-100">
        {tabs.map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`
              flex-1 min-w-0 px-6 py-4 rounded-xl font-semibold text-sm sm:text-base
              transition-all duration-200 ease-out
              ${
                activeTab === tab.id
                  ? "bg-gradient-to-r from-orange-500 to-orange-600 text-white shadow-lg shadow-orange-500/25"
                  : "text-gray-600 hover:text-orange-600 hover:bg-white/50"
              }
            `}
          >
            <div className="flex items-center justify-center space-x-2">
              {/* Mobile: Show only icon */}
              <div className="sm:hidden flex items-center space-x-1">
                <tab.icon className="w-5 h-5" />
                <span
                  className={`
                    px-2 py-1 rounded-full text-xs font-bold
                    ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-orange-100 text-orange-600"
                    }
                  `}
                >
                  {tab.count}
                </span>
              </div>

              {/* Desktop: Show icon + text + count */}
              <div className="hidden sm:flex items-center space-x-2">
                <tab.icon className="w-4 h-4" />
                <span className="truncate">{tab.label}</span>
                <span
                  className={`
                    px-2 py-1 rounded-full text-xs font-bold
                    ${
                      activeTab === tab.id
                        ? "bg-white/20 text-white"
                        : "bg-orange-100 text-orange-600"
                    }
                  `}
                >
                  {tab.count}
                </span>
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* Tab Content */}
      <div className="space-y-6">
        {/* Section Header */}
        <div className="flex items-center justify-between">
          <h2 className="text-xl sm:text-2xl font-bold text-gray-900 flex items-center">
            {/* Mobile: Show icon + abbreviated label */}
            <div className="sm:hidden flex items-center space-x-2">
              {(() => {
                const activeTabData = tabs.find((tab) => tab.id === activeTab);
                const IconComponent = activeTabData?.icon;
                return (
                  IconComponent && (
                    <IconComponent className="w-6 h-6 text-orange-600" />
                  )
                );
              })()}
              <span>
                {activeTab === "paid" && "Paid"}
                {activeTab === "other" && "Other"}
                {activeTab === "bookmarks" && "Saved"}
              </span>
            </div>

            {/* Desktop: Show full label */}
            <div className="hidden sm:flex items-center">
              {tabs.find((tab) => tab.id === activeTab)?.label}
              {activeTab === "bookmarks" && (
                <span className="ml-2 text-orange-600">
                  <Bookmark className="w-5 h-5 inline" />
                </span>
              )}
            </div>
          </h2>
          <div className="text-sm text-gray-500">
            {activeAgents.length}{" "}
            {activeAgents.length === 1 ? "agent" : "agents"}
          </div>
        </div>

        {/* Agents Grid */}
        {activeAgents.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
            {activeAgents.map((agent) => (
              <AgentCard
                key={`${activeTab}-${agent.id}`}
                agent={agent}
                onClick={() => onAgentClick(agent)}
              />
            ))}
          </div>
        ) : (
          <div className="text-center py-12">
            <div className="text-gray-500 mb-2">
              {activeTab === "bookmarks"
                ? "No bookmarked agents yet"
                : "No agents available"}
            </div>
            <div className="text-sm text-gray-400">
              {activeTab === "bookmarks"
                ? "Start bookmarking agents to see them here"
                : "Check back later for new agents"}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
