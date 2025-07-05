import { Card, CardContent } from "@/components/ui/card";
import { Star } from "lucide-react";
import { motion } from "framer-motion";

interface AgentCardProps {
  image: string;
  title: string;
  description: string;
  rating: number;
  votes: number;
  onClick?: () => void;
}

export function AgentCard({
  image,
  title,
  description,
  rating,
  votes,
  onClick,
}: AgentCardProps) {
  return (
    <motion.div
      whileHover={{ scale: 1.02, y: -4 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="w-full"
    >
      <Card
        onClick={onClick}
        className="group cursor-pointer overflow-hidden rounded-2xl border border-orange-100/50 
        bg-white shadow-lg shadow-orange-500/5 hover:shadow-xl hover:shadow-orange-500/10 hover:border-orange-200/70
        transition-all duration-300 ease-out
        focus-within:ring-2 focus-within:ring-orange-500 focus-within:ring-offset-2"
        role="button"
        tabIndex={0}
        aria-label={`View details for ${title}`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") {
            e.preventDefault();
            onClick?.();
          }
        }}
      >
        <CardContent className="p-0">
          {/* Image Section - Enhanced */}
          <div className="relative w-full h-40 sm:h-44 lg:h-48 overflow-hidden bg-gradient-to-br from-orange-50 to-orange-100/50">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500 ease-out"
              loading="lazy"
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src =
                  "https://placehold.co/400x300/f97316/ffffff?text=AI+Agent";
              }}
            />
            {/* Gradient overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>

            {/* Rating badge */}
            <div className="absolute top-3 right-3 bg-white/90 backdrop-blur-sm rounded-full px-2 py-1 flex items-center space-x-1 shadow-lg">
              <Star className="w-3 h-3 text-yellow-500 fill-yellow-500" />
              <span className="text-xs font-semibold text-gray-800">
                {rating}
              </span>
            </div>
          </div>

          {/* Content Section - Enhanced */}
          <div className="p-4 sm:p-5 lg:p-6">
            {/* Title */}
            <h3 className="text-base sm:text-lg lg:text-xl font-bold text-gray-900 mb-2 line-clamp-1 group-hover:text-orange-600 transition-colors duration-200">
              {title}
            </h3>

            {/* Description */}
            <p className="text-sm sm:text-base text-gray-600 mb-4 line-clamp-2 leading-relaxed">
              {description}
            </p>

            {/* Stats Section */}
            <div className="flex items-center justify-between pt-3 border-t border-gray-100">
              {/* Rating */}
              <div className="flex items-center space-x-1">
                <div
                  className="flex items-center"
                  aria-label={`Rating: ${rating} out of 5 stars`}
                >
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-3 h-3 sm:w-4 sm:h-4 ${
                        index < Math.floor(rating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-xs sm:text-sm text-gray-500 font-medium ml-1">
                  ({votes})
                </span>
              </div>

              {/* Action indicator */}
              <div className="text-xs text-orange-600 font-semibold opacity-0 group-hover:opacity-100 transition-opacity duration-200">
                View Details →
              </div>
            </div>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
