import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";
import { OptimizedImage } from "@/components/ui/optimized-image";
import type { Agent } from "@/types/agent";

interface AgentCardProps {
  agent: Agent;
  onClick?: (agent: Agent) => void;
}

export function AgentCard({ agent, onClick }: AgentCardProps) {
  const handleClick = () => {
    onClick?.(agent);
  };

  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="w-full"
    >
      <Card
        onClick={handleClick}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-orange-100/50 
        bg-white shadow-lg shadow-orange-500/5 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200/70
        transition-all duration-300 ease-out
        focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${agent.title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            handleClick();
          }
        }}
      >
        <CardContent className="p-0">
          {/* Image Section - Enhanced */}
          <div className="relative w-full h-40 sm:h-44 lg:h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/50">
            <OptimizedImage
              src={agent.image}
              alt={agent.title}
              width={400}
              height={300}
              className="w-full h-full group-hover:scale-110 transition-transform duration-500 ease-out"
              loading="lazy"
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Rating badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-lg">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-semibold text-gray-800">
                {agent.rating}
              </span>
            </div>

            {/* Owned badge */}
            {agent.isPurchased && (
              <div className="absolute top-3 left-3 bg-green-500 text-white rounded-full px-2 py-1 flex items-center space-x-1 shadow-lg">
                <div className="w-2 h-2 bg-white rounded-full"></div>
                <span className="text-xs font-semibold">Owned</span>
              </div>
            )}

            {/* Price badge for non-purchased agents */}
            {!agent.isPurchased && agent.price && agent.price !== "0" && (
              <div className="absolute bottom-3 right-3 bg-orange-500 text-white rounded-full px-2 py-1 shadow-lg">
                <span className="text-xs font-semibold">${agent.price}</span>
              </div>
            )}
          </div>

          {/* Content Section - Enhanced */}
          <div className="p-4 sm:p-5 lg:p-6">
            {/* Title */}
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">
              {agent.title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {agent.description}
            </p>

            {/* Stats Section */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div
                  className="flex items-center"
                  aria-label={`Rating: ${agent.rating} out of 5 stars`}
                >
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        index < Math.floor(agent.rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-500 font-medium ml-1">
                  ({agent.votes})
                </span>
              </div>

              {/* Action indicator */}
              <div className="text-xs font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                {agent.isPurchased ? (
                  <span className="text-green-600">Run Agent →</span>
                ) : (
                  <span className="text-orange-600">Buy Agent →</span>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
