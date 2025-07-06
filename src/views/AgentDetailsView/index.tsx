import { ActionButtons } from "@/entities/Details/components/ActionButtons";
import { AgentDescription } from "@/entities/Details/components/AgentDescription";
import { AgentDetails } from "@/entities/Details/components/AgentDetails";
import { AgentImage } from "@/entities/Details/components/AgentImage";
import { AgentInfo } from "@/entities/Details/components/AgentInfo";
import { Header } from "@/entities/Details/components/Header";
import { useFlowQuery } from "@onflow/kit";
import { useNavigate } from "@tanstack/react-router";

interface AgentDetailsViewProps {
  onBack?: () => void;
}

export function AgentDetailsView({ onBack }: AgentDetailsViewProps) {
  const navigate = useNavigate();

  const { data, isLoading } = useFlowQuery({
    cadence: `
   import "Agents"

access(all)
fun main(): &[Agents.Agent] {
  return Agents.getAgents()
}
    `,
    // args: (arg, t) => [arg(1, t.Int), arg(2, t.Int)],
    query: { staleTime: 10000 },
  });

  const agent = data && Array.isArray(data) && data.length > 0 ? data[0] : null;

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      navigate({ to: "/" });
    }
  };

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-orange-50 via-white to-orange-50/30 text-gray-900">
      {/* Header with Back Button */}
      <Header onBack={handleBack} />

      <div className="relative px-4 py-6 sm:px-6 lg:px-8 max-w-7xl mx-auto">
        {/* Subtle background pattern */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,_rgba(249,115,22,0.1)_1px,_transparent_0)] bg-[length:24px_24px] opacity-30 pointer-events-none"></div>

        <div className="relative">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column - Agent Image */}
            <AgentImage agent={agent} />

            {/* Right Column - Agent Details */}
            <div className="lg:col-span-2 space-y-6">
              {/* Title and Rating */}
              <AgentInfo agent={agent} />

              {/* Action Buttons */}
              <ActionButtons agent={agent} />

              {/* Description */}
              <AgentDescription agent={agent} />

              {/* Agent Details */}
              <AgentDetails agent={agent} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
