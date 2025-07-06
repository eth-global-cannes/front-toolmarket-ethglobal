import { getAverageRating, getReviewCount } from "@/data/mockReviews";
import type { Agent } from "@/types/agent";
import { motion } from "framer-motion";
import { Star } from "lucide-react";
import { useState } from "react";
import { ReviewsModal } from "../ReviewsModal";

interface AgentInfoProps {
  agent: Agent;
}

export function AgentInfo({ agent }: AgentInfoProps) {
  const [showReviewsModal, setShowReviewsModal] = useState(false);

  // Get real review data
  const averageRating = getAverageRating(agent.id);
  const reviewCount = getReviewCount(agent.id);

  const handleStarsClick = () => {
    setShowReviewsModal(true);
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4, delay: 0.1 }}
    >
      <h1 className="text-3xl sm:text-4xl lg:text-5xl font-bold text-gray-900 mb-2">
        {agent.name}
      </h1>

      {/* Rating */}
      <div className="flex items-center space-x-4 mb-4">
        <button
          onClick={handleStarsClick}
          className="flex items-center space-x-1 hover:scale-105 transition-transform duration-200 group"
        >
          {[...Array(5)].map((_, index) => (
            <Star
              key={index}
              className={`w-6 h-6 transition-colors duration-200 ${
                index < Math.floor(averageRating)
                  ? "text-yellow-500 fill-yellow-500 group-hover:text-yellow-600"
                  : "text-gray-300 fill-gray-300 group-hover:text-gray-400"
              }`}
            />
          ))}
        </button>
        <button
          onClick={handleStarsClick}
          className="text-lg text-gray-600 font-medium hover:text-orange-600 transition-colors duration-200"
        >
          {averageRating} ({reviewCount} reviews)
        </button>
      </div>

      {/* Developer */}
      <div className="text-lg text-gray-600 mb-6 font-medium">
        {agent?.developer || "AI Developer"}
      </div>

      {/* Reviews Modal */}
      <ReviewsModal
        agent={agent}
        isOpen={showReviewsModal}
        onClose={() => setShowReviewsModal(false)}
      />
    </motion.div>
  );
}
