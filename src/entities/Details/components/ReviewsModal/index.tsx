import { useState } from "react";
import { Star, Filter, SortDesc } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { ReviewCard } from "../ReviewCard";
import { getReviewsForAgent, getAverageRating } from "@/data/mockReviews";
import type { Agent } from "@/types/agent";

interface ReviewsModalProps {
  agent: Agent;
  isOpen: boolean;
  onClose: () => void;
}

type SortOption = "newest" | "oldest" | "highest" | "lowest" | "helpful";
type FilterOption = "all" | "5" | "4" | "3" | "2" | "1";

export function ReviewsModal({ agent, isOpen, onClose }: ReviewsModalProps) {
  const [sortBy, setSortBy] = useState<SortOption>("newest");
  const [filterBy, setFilterBy] = useState<FilterOption>("all");

  const allReviews = getReviewsForAgent(agent.id);
  const averageRating = getAverageRating(agent.id);

  // Filter reviews
  const filteredReviews = allReviews.filter((review) => {
    if (filterBy === "all") return true;
    return review.rating === parseInt(filterBy);
  });

  // Sort reviews
  const sortedReviews = [...filteredReviews].sort((a, b) => {
    switch (sortBy) {
      case "newest":
        return new Date(b.date).getTime() - new Date(a.date).getTime();
      case "oldest":
        return new Date(a.date).getTime() - new Date(b.date).getTime();
      case "highest":
        return b.rating - a.rating;
      case "lowest":
        return a.rating - b.rating;
      case "helpful":
        return b.helpful - a.helpful;
      default:
        return 0;
    }
  });

  // Calculate rating distribution
  const ratingDistribution = [5, 4, 3, 2, 1].map((rating) => {
    const count = allReviews.filter(
      (review) => review.rating === rating
    ).length;
    const percentage =
      allReviews.length > 0 ? (count / allReviews.length) * 100 : 0;
    return { rating, count, percentage };
  });

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[85vh] bg-white border-orange-200 p-0 overflow-hidden">
        {/* Header */}
        <DialogHeader className="p-4 pb-3 border-b border-orange-100">
          <div>
            <DialogTitle className="text-xl font-bold text-gray-900 mb-2">
              Reviews for {agent.title}
            </DialogTitle>
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <div className="flex items-center space-x-1">
                  {[...Array(5)].map((_, index) => (
                    <Star
                      key={index}
                      className={`w-4 h-4 ${
                        index < Math.floor(averageRating)
                          ? "text-yellow-500 fill-yellow-500"
                          : "text-gray-300 fill-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <span className="text-base font-semibold text-gray-900">
                  {averageRating}
                </span>
                <span className="text-sm text-gray-600">
                  ({allReviews.length} reviews)
                </span>
              </div>
            </div>
          </div>
        </DialogHeader>

        {/* Rating Distribution */}
        <div className="p-4 border-b border-orange-100 bg-orange-50/30">
          <h3 className="text-sm font-semibold text-gray-900 mb-2">
            Rating Distribution
          </h3>
          <div className="space-y-1.5">
            {ratingDistribution.map(({ rating, count, percentage }) => (
              <div key={rating} className="flex items-center space-x-2">
                <div className="flex items-center space-x-1 w-10">
                  <span className="text-xs text-gray-600">{rating}</span>
                  <Star className="w-2.5 h-2.5 text-yellow-500 fill-yellow-500" />
                </div>
                <div className="flex-1 bg-gray-200 rounded-full h-1.5">
                  <div
                    className="bg-orange-500 h-1.5 rounded-full transition-all duration-300"
                    style={{ width: `${percentage}%` }}
                  />
                </div>
                <span className="text-xs text-gray-600 w-6">{count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Filters and Sorting */}
        <div className="p-4 border-b border-orange-100">
          <div className="flex items-center justify-between flex-wrap gap-3">
            <div className="flex items-center space-x-3">
              <div className="flex items-center space-x-2">
                <Filter className="w-3 h-3 text-gray-500" />
                <span className="text-xs font-medium text-gray-700">
                  Filter:
                </span>
                <select
                  value={filterBy}
                  onChange={(e) => setFilterBy(e.target.value as FilterOption)}
                  className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
                >
                  <option value="all">All ratings</option>
                  <option value="5">5 stars</option>
                  <option value="4">4 stars</option>
                  <option value="3">3 stars</option>
                  <option value="2">2 stars</option>
                  <option value="1">1 star</option>
                </select>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              <SortDesc className="w-3 h-3 text-gray-500" />
              <span className="text-xs font-medium text-gray-700">
                Sort by:
              </span>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as SortOption)}
                className="text-xs border border-gray-300 rounded-md px-2 py-1 focus:outline-none focus:ring-1 focus:ring-orange-500 focus:border-orange-500"
              >
                <option value="newest">Newest first</option>
                <option value="oldest">Oldest first</option>
                <option value="highest">Highest rating</option>
                <option value="lowest">Lowest rating</option>
                <option value="helpful">Most helpful</option>
              </select>
            </div>
          </div>
        </div>

        {/* Reviews List */}
        <div className="flex-1 overflow-y-auto overflow-x-hidden p-4 space-y-3 max-h-[45vh] reviews-scroll">
          {sortedReviews.length > 0 ? (
            <>
              {sortedReviews.map((review) => (
                <ReviewCard key={review.id} review={review} />
              ))}
              {/* Bottom padding for better scroll experience */}
              <div className="pb-24"></div>
            </>
          ) : (
            <div className="text-center py-8">
              <div className="text-gray-500 mb-2">No reviews found</div>
              <div className="text-sm text-gray-400">
                Try adjusting your filters
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-orange-100 bg-gray-50">
          <div className="flex items-center justify-between">
            <div className="text-xs text-gray-600">
              Showing {sortedReviews.length} of {allReviews.length} reviews
            </div>
            <Button
              onClick={onClose}
              className="bg-orange-500 hover:bg-orange-600 text-white px-4 py-1.5 rounded-lg font-medium text-sm"
            >
              Close
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
