import { useState } from "react";
import { Star, MessageSquare } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Textarea } from "@/components/ui/textarea";

export function FeedbackModal() {
  const [feedback, setFeedback] = useState("");
  const [userRating, setUserRating] = useState(0);

  const handleFeedbackSubmit = () => {
    console.log("Feedback submitted:", { feedback, rating: userRating });
    setFeedback("");
    setUserRating(0);
  };

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button className="bg-gradient-to-r from-orange-500 to-orange-600 hover:from-orange-600 hover:to-orange-700 text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg shadow-orange-500/25 hover:shadow-orange-500/40 transition-all duration-200 transform hover:scale-105">
          <MessageSquare className="w-5 h-5 mr-2" />
          Add Feedback
        </Button>
      </DialogTrigger>
      <DialogContent className="bg-gray-900 border-gray-700 text-white">
        <DialogHeader>
          <DialogTitle className="text-xl font-bold">
            Share Your Experience
          </DialogTitle>
        </DialogHeader>
        <div className="space-y-4">
          {/* Rating Selection */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Rating
            </label>
            <div className="flex space-x-1">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  onClick={() => setUserRating(star)}
                  className="focus:outline-none"
                >
                  <Star
                    className={`w-8 h-8 transition-colors ${
                      star <= userRating
                        ? "text-yellow-400 fill-yellow-400"
                        : "text-gray-600 hover:text-yellow-400"
                    }`}
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Feedback Text */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">
              Your Feedback
            </label>
            <Textarea
              value={feedback}
              onChange={(e) => setFeedback(e.target.value)}
              placeholder="Share your experience with this AI agent..."
              className="bg-gray-800 border-gray-600 text-white placeholder-gray-400 min-h-[120px]"
            />
          </div>

          {/* Submit Button */}
          <Button
            onClick={handleFeedbackSubmit}
            disabled={!feedback.trim() || userRating === 0}
            className="w-full bg-orange-500 hover:bg-orange-600 text-white font-semibold py-2 rounded-xl"
          >
            Submit Feedback
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  );
}
