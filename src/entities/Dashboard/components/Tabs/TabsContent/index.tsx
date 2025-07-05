import { AgentCard } from "../../AgentCard";
import type { Agent } from "@/types/agent";

interface TabsAgentListProps {
  agents: Agent[];
  onAgentClick?: (agent: Agent) => void;
}

export function TabsAgentList({ agents, onAgentClick }: TabsAgentListProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 sm:gap-6 lg:gap-8">
      {agents.map((agent) => (
        <AgentCard key={agent.id} agent={agent} onClick={onAgentClick} />
      ))}
    </div>
  );
}
