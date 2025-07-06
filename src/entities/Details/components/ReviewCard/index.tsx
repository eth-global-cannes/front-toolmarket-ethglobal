import { Star, ThumbsUp, Shield, Copy, Check } from "lucide-react";
import { useState } from "react";
import type { Review } from "@/types/review";

interface ReviewCardProps {
  review: Review;
}

export function ReviewCard({ review }: ReviewCardProps) {
  const [copied, setCopied] = useState(false);

  const handleCopyWallet = async () => {
    try {
      await navigator.clipboard.writeText(review.user.wallet);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy wallet address:", error);
    }
  };

  const formatWallet = (wallet: string) => {
    return `${wallet.slice(0, 6)}...${wallet.slice(-4)}`;
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  return (
    <div className="bg-white rounded-lg border border-orange-100 p-4 shadow-sm hover:shadow-md transition-shadow duration-200 w-full min-w-0">
      {/* User Info */}
      <div className="flex items-start space-x-3 mb-3">
        <div className="relative">
          <img
            src={review.user.avatar}
            alt={review.user.name}
            className="w-10 h-10 rounded-full border-2 border-orange-100"
          />
          {review.user.verified && (
            <div className="absolute -bottom-0.5 -right-0.5 bg-blue-500 rounded-full p-0.5">
              <Shield className="w-2.5 h-2.5 text-white" />
            </div>
          )}
        </div>

        <div className="flex-1 min-w-0">
          <div className="flex items-center space-x-2 mb-1">
            <h4 className="font-medium text-gray-900 text-sm truncate">
              {review.user.name}
            </h4>
            {review.user.verified && (
              <span className="text-xs bg-blue-100 text-blue-700 px-1.5 py-0.5 rounded-full font-medium">
                Verified
              </span>
            )}
          </div>

          <div className="flex items-center space-x-2">
            <button
              onClick={handleCopyWallet}
              className="flex items-center space-x-1 text-xs text-gray-500 hover:text-orange-600 transition-colors duration-200 group"
            >
              <span className="font-mono text-xs">
                {formatWallet(review.user.wallet)}
              </span>
              {copied ? (
                <Check className="w-2.5 h-2.5 text-green-500" />
              ) : (
                <Copy className="w-2.5 h-2.5 group-hover:text-orange-600" />
              )}
            </button>
          </div>
        </div>

        <div className="text-right">
          <div className="flex items-center space-x-0.5 mb-1">
            {[...Array(5)].map((_, index) => (
              <Star
                key={index}
                className={`w-3 h-3 ${
                  index < review.rating
                    ? "text-yellow-500 fill-yellow-500"
                    : "text-gray-300 fill-gray-300"
                }`}
              />
            ))}
          </div>
          <span className="text-xs text-gray-500">
            {formatDate(review.date)}
          </span>
        </div>
      </div>

      {/* Review Content */}
      <div className="mb-3">
        <p className="text-gray-700 leading-relaxed text-sm break-words overflow-hidden">
          {review.comment}
        </p>
      </div>

      {/* Review Actions */}
      <div className="flex items-center justify-between pt-3 border-t border-gray-100">
        <button className="flex items-center space-x-1.5 text-xs text-gray-500 hover:text-orange-600 transition-colors duration-200">
          <ThumbsUp className="w-3 h-3" />
          <span>Helpful ({review.helpful})</span>
        </button>

        <div className="flex items-center space-x-2 text-xs text-gray-400">
          <span>Review #{review.id}</span>
        </div>
      </div>
    </div>
  );
}
