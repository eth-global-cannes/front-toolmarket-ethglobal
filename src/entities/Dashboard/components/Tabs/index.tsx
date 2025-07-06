import { Tabs as TabsRoot, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { TabsContent as TabsContentRoot } from "@/components/ui/tabs";
import { TabsAgentList } from "./TabsContent";
import type { Agent } from "@/types/agent";

interface TabsProps {
  paidAgents: Agent[];
  otherAgents: Agent[];
  onAgentClick?: (agent: Agent) => void;
}

export function Tabs({ paidAgents, otherAgents, onAgentClick }: TabsProps) {
  return (
    <TabsRoot defaultValue="paid" className="w-full">
      {/* Enhanced Tabs List */}
      <div className="flex justify-center mb-8 sm:mb-10">
        <TabsList className="grid w-full max-w-md grid-cols-2 bg-orange-50/80 backdrop-blur-sm border border-orange-100 rounded-2xl p-1 shadow-lg shadow-orange-500/5">
          <TabsTrigger
            value="paid"
            className="relative rounded-xl py-3 px-4 text-sm sm:text-base font-semibold transition-all duration-200 ease-out
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 
            data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/25
            data-[state=inactive]:text-orange-600 data-[state=inactive]:hover:bg-orange-100/50
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange-50"
          >
            <span className="relative z-10">
              Premium Agents
              <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full data-[state=active]:bg-orange-400 data-[state=active]:text-white">
                {paidAgents.length}
              </span>
            </span>
          </TabsTrigger>
          <TabsTrigger
            value="other"
            className="relative rounded-xl py-3 px-4 text-sm sm:text-base font-semibold transition-all duration-200 ease-out
            data-[state=active]:bg-gradient-to-r data-[state=active]:from-orange-500 data-[state=active]:to-orange-600 
            data-[state=active]:text-white data-[state=active]:shadow-lg data-[state=active]:shadow-orange-500/25
            data-[state=inactive]:text-orange-600 data-[state=inactive]:hover:bg-orange-100/50
            focus:outline-none focus:ring-2 focus:ring-orange-500 focus:ring-offset-2 focus:ring-offset-orange-50"
          >
            <span className="relative z-10">
              Free Agents
              <span className="ml-2 text-xs bg-orange-100 text-orange-700 px-2 py-0.5 rounded-full data-[state=active]:bg-orange-400 data-[state=active]:text-white">
                {otherAgents.length}
              </span>
            </span>
          </TabsTrigger>
        </TabsList>
      </div>

      {/* Enhanced Tabs Content */}
      <div className="space-y-6">
        <TabsContentRoot value="paid" className="mt-0 space-y-6">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Premium AI Agents
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Professional-grade AI agents with advanced capabilities and
              dedicated support
            </p>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <div className="w-2 h-2 bg-orange-500 rounded-full"></div>
              <span className="text-xs text-orange-600 font-medium">
                {paidAgents.length} Premium Agents Available
              </span>
            </div>
          </div>

          <TabsAgentList agents={paidAgents} onAgentClick={onAgentClick} />
        </TabsContentRoot>

        <TabsContentRoot value="other" className="mt-0 space-y-6">
          {/* Section Header */}
          <div className="text-center space-y-2">
            <h2 className="text-xl sm:text-2xl lg:text-3xl font-bold text-gray-900">
              Free AI Agents
            </h2>
            <p className="text-sm sm:text-base text-gray-600 max-w-2xl mx-auto">
              Open-source and community-driven AI agents to get you started
            </p>
            <div className="flex items-center justify-center space-x-2 mt-3">
              <div className="w-2 h-2 bg-green-500 rounded-full"></div>
              <span className="text-xs text-green-600 font-medium">
                {otherAgents.length} Free Agents Available
              </span>
            </div>
          </div>

          <TabsAgentList agents={otherAgents} onAgentClick={onAgentClick} />
        </TabsContentRoot>
      </div>
    </TabsRoot>
  );
}
