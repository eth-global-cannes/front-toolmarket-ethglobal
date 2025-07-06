import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type { Agent } from "@/types/agent";

interface AgentImageProps {
  agent: Agent;
}

export function AgentImage({ agent }: AgentImageProps) {
  return (
    <div className="lg:col-span-1">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative aspect-square rounded-2xl overflow-hidden bg-gradient-to-br from-orange-100/50 to-orange-200/30 border border-orange-200/50 shadow-lg shadow-orange-500/10"
      >
        <OptimizedImage
          src={agent.image}
          alt={agent.title}
          width={400}
          height={400}
          className="w-full h-full"
          priority={true}
        />

        {/* Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />

        {/* Price Badge */}
        {agent.price && (
          <div className="absolute top-4 right-4 bg-orange-500 text-white px-3 py-1 rounded-full text-sm font-semibold">
            ${agent.price}
          </div>
        )}

        {/* Owned Badge */}
        {agent.isPurchased && (
          <div className="absolute top-4 left-4 bg-green-500 text-white px-3 py-1 rounded-full text-sm font-semibold flex items-center gap-1">
            <div className="w-2 h-2 bg-white rounded-full"></div>
            Owned
          </div>
        )}
      </motion.div>

      {/* Platforms/Categories */}
      <div className="mt-4 space-y-2">
        <h3 className="text-sm font-medium text-gray-600 uppercase tracking-wider">
          Categories
        </h3>
        <div className="flex flex-wrap gap-2">
          {["AI Agent", "Automation", "Smart Contract"].map((category) => (
            <span
              key={category}
              className="px-3 py-1 bg-orange-100 text-orange-700 rounded-full text-xs border border-orange-200 font-medium"
            >
              {category}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
