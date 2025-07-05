import { Star } from "lucide-react";
import { motion } from "framer-motion";
import type { Agent } from "@/types/agent";

interface AgentInfoProps {
  agent: Agent;
}

export function AgentInfo({ agent }: AgentInfoProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-white mb-2">
        {agent.title}
      </h1>

      {/* Rating */}
      <div className="flex items-center space-x-4 mb-4">
        <div className="flex items-center space-x-1">
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-6 h-6 ${
                index < Math.floor(agent.rating)
                  ? "text-yellow-400 fill-yellow-400"
                  : "text-gray-600 fill-gray-600"
              }`}
            />
          ))}
        </div>
        <span className="text-lg text-gray-300">
          {agent.rating} ({agent.votes} reviews)
        </span>
      </div>

      {/* Developer */}
      <div className="text-lg text-gray-400 mb-6">
        {agent.developer || "AI Developer"}
      </div>
    </motion.div>
  );
}
