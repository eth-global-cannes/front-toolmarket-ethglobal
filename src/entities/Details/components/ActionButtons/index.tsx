import { useState, useEffect } from "react";
import { Bookmark, Copy, Check, Play, ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { motion } from "framer-motion";
import { FeedbackModal } from "../FeedbackModal";
import { RunAgentModal } from "../RunAgentModal";
import { addBookmark, removeBookmark, isBookmarked } from "@/utils/bookmarks";
import type { Agent } from "@/types/agent";
import type { Parameter } from "@/types/parameter";

interface ActionButtonsProps {
  agent: Agent;
}

export function ActionButtons({ agent }: ActionButtonsProps) {
  const [bookmarked, setBookmarked] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isPurchased, setIsPurchased] = useState(agent.isPurchased);
  const [isRunModalOpen, setIsRunModalOpen] = useState(false);

  // Check if agent is bookmarked on mount
  useEffect(() => {
    const id = typeof agent.id === "string" ? parseInt(agent.id, 10) : agent.id;
    setBookmarked(isBookmarked(id));
  }, [agent.id]);

  const handleBookmark = () => {
    if (bookmarked) {
      const id =
        typeof agent.id === "string" ? parseInt(agent.id, 10) : agent.id;
      removeBookmark(id);
      setBookmarked(false);
    } else {
      addBookmark(agent);
      setBookmarked(true);
    }
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (error) {
      console.error("Failed to copy URL:", error);
    }
  };

  const handlePurchase = () => {
    console.log("Purchasing agent:", agent.title);
    // Simulate purchase success
    setIsPurchased(true);
  };

  const handleRunAgent = async (parameters: Parameter[]) => {
    try {
      console.log("Running agent:", agent.title);
      // Here you would implement the actual run agent logic
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/api/agents/${agent.id}/run/`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            agentId: agent.id,
            parameters: parameters,
          }),
        }
      );

      if (!response.ok) {
        throw new Error("Failed to run agent");
      }

      const data = await response.json();
      console.log("Agent running:", data);
      // You could add a success toast or message here
    } catch (error) {
      console.error("Error running agent:", error);
      // You could add an error toast or message here
    }
  };

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4, delay: 0.2 }}
        className="flex flex-wrap items-center gap-4"
      >
        {/* Show both buttons if purchased */}
        {isPurchased ? (
          <>
            <Button
              onClick={() => setIsRunModalOpen(true)}
              className="bg-gradient-to-r from-green-500 to-green-600 hover:from-green-600 hover:to-green-700 
              text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg shadow-green-500/25
              hover:shadow-green-500/40 transition-all duration-200 transform hover:scale-105"
            >
              <Play className="w-5 h-5 mr-2 fill-current" />
              Run Agent
            </Button>
          </>
        ) : (
          <Button
            onClick={handlePurchase}
            className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 
            text-white px-8 py-3 rounded-xl text-lg font-semibold shadow-lg shadow-blue-500/25
            hover:shadow-blue-500/40 transition-all duration-200 transform hover:scale-105"
          >
            <ShoppingCart className="w-5 h-5 mr-2" />
            Buy Agent ${agent.price}
          </Button>
        )}

        {/* Add Feedback Button */}
        <FeedbackModal />

        {/* Bookmark Button */}
        <button
          onClick={handleBookmark}
          className={`p-3 rounded-xl border-2 transition-all duration-200 ${
            bookmarked
              ? "border-orange-500 bg-orange-500/10 text-orange-500"
              : "border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300"
          }`}
        >
          <Bookmark className={`w-6 h-6 ${bookmarked ? "fill-current" : ""}`} />
        </button>

        {/* Copy URL Button */}
        <button
          onClick={handleCopy}
          className="p-3 rounded-xl border-2 border-gray-600 hover:border-gray-500 text-gray-400 hover:text-gray-300 transition-all duration-200"
        >
          {copied ? (
            <Check className="w-6 h-6 text-green-500" />
          ) : (
            <Copy className="w-6 h-6" />
          )}
        </button>
      </motion.div>

      {/* Run Agent Modal */}
      <RunAgentModal
        isOpen={isRunModalOpen}
        onClose={() => setIsRunModalOpen(false)}
        onRun={handleRunAgent}
      />
    </>
  );
}
