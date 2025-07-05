import { AgentCard } from "@/entities/Dashboard/components/AgentCard";

interface TabsAgentListProps {
  agents: Array<{
    id: number;
    image: string;
    title: string;
    description: string;
    rating: number;
    votes: number;
  }>;
}

export function TabsAgentList({ agents }: TabsAgentListProps) {
  return (
    <div className="w-full">
      {/* Mobile First Grid - Progressive Enhancement */}
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 sm:gap-5 lg:grid-cols-3 lg:gap-6 xl:grid-cols-4">
        {agents.map((agent) => (
          <AgentCard
            key={agent.id}
            image={agent.image}
            title={agent.title}
            description={agent.description}
            rating={agent.rating}
            votes={agent.votes}
            onClick={() => console.log(`Clicked agent ${agent.id}`)}
          />
        ))}
      </div>

      {/* Empty State */}
      {agents.length === 0 && (
        <div className="flex flex-col items-center justify-center py-12 sm:py-16 lg:py-20">
          <div className="text-center">
            <h3 className="text-lg sm:text-xl font-medium text-gray-900 mb-2">
              No agents found
            </h3>
            <p className="text-sm sm:text-base text-gray-500 max-w-sm">
              Try adjusting your search criteria or check back later for new
              agents.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
