import { Tag, User, Calendar } from "lucide-react";
import { motion } from "framer-motion";
import type { Agent } from "@/types/agent";

interface AgentDetailsProps {
  agent: Agent;
}

export function AgentDetails({ agent }: AgentDetailsProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.4 }}
      className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-6 border-t border-orange-200/50"
    >
      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-500">
          <Tag className="w-4 h-4" />
          <span className="text-sm font-medium">Category</span>
        </div>
        <p className="text-gray-900 font-semibold">
          {agent.category || "AI Automation"}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-500">
          <User className="w-4 h-4" />
          <span className="text-sm font-medium">Developer</span>
        </div>
        <p className="text-gray-900 font-semibold">
          {agent.developer || "AI Developer"}
        </p>
      </div>

      <div className="space-y-2">
        <div className="flex items-center space-x-2 text-gray-500">
          <Calendar className="w-4 h-4" />
          <span className="text-sm font-medium">Release Date</span>
        </div>
        <p className="text-gray-900 font-semibold">
          {agent.releaseDate || "December 2024"}
        </p>
      </div>
    </motion.div>
  );
}
