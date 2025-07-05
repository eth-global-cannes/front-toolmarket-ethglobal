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
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
    >
      <Card
        onClick={onClick}
        className="group overflow-hidden rounded-lg border border-gray-200 cursor-pointer hover:border-gray-300 transition-all duration-200"
      >
        <CardContent className="p-0">
          <div className="relative w-full h-48 overflow-hidden bg-gray-100">
            <img
              src={image}
              alt={title}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
              style={{
                width: "100%",
                height: "100%",
              }}
              onError={(e) => {
                const target = e.target as HTMLImageElement;
                target.src = "https://placehold.co/400x300/png?text=Agent";
              }}
            />
          </div>
          <div className="p-4">
            <h2 className="text-xl font-medium font-display mb-2 line-clamp-1">
              {title}
            </h2>
            <p className="text-black/70 mb-4 line-clamp-2">{description}</p>
            <div className="flex items-center mb-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, index) => (
                  <Star
                    key={index}
                    className={`w-4 h-4 ${
                      index < rating
                        ? "text-yellow-500 fill-yellow-500"
                        : "text-gray-300 fill-gray-300"
                    }`}
                  />
                ))}
              </div>
              <span className="ml-2 text-black/70">{rating} stars</span>
            </div>
            <p className="text-black/70">Number of votes: {votes}</p>
          </div>
        </CardContent>
      </Card>
    </motion.div>
  );
}
