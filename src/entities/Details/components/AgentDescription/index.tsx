import { motion } from "framer-motion";
import type { Agent } from "@/types/agent";

interface AgentDescriptionProps {
  agent: Agent;
}

export function AgentDescription({ agent }: AgentDescriptionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.3 }}
      className="space-y-4"
    >
      <p className="text-gray-300 text-lg leading-relaxed">
        {agent.description}
      </p>

      {agent.longDescription && (
        <p className="text-gray-400 leading-relaxed">{agent.longDescription}</p>
      )}
    </motion.div>
  );
}
