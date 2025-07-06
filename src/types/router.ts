import type { Agent } from "./agent";

export type ViewType = "marketplace" | "agent-details";

export interface RouteState {
  view: ViewType;
  agentId?: number;
}

export interface RouterState {
  currentView: ViewType;
  selectedAgent?: Agent;
}

export interface RouterActions {
  navigateToMarketplace: () => void;
  navigateToAgentDetails: (agent: Agent) => void;
}
