import { useEffect } from "react";
import type { Agent } from "@/types/agent";

interface PageMetaOptions {
  title?: string;
  description?: string;
  agent?: Agent;
}

export function usePageMeta(options: PageMetaOptions = {}) {
  useEffect(() => {
    // Update page title
    if (options.title) {
      document.title = options.title;

      // Update title element if it exists
      const titleElement = document.getElementById("page-title");
      if (titleElement) {
        titleElement.textContent = options.title;
      }
    }

    // Update meta description
    if (options.description) {
      const metaDescription = document.querySelector(
        'meta[name="description"]'
      );
      if (metaDescription) {
        metaDescription.setAttribute("content", options.description);
      }
    }

    // Update Open Graph tags if agent is provided
    if (options.agent) {
      const ogTitle = document.querySelector('meta[property="og:title"]');
      const ogDescription = document.querySelector(
        'meta[property="og:description"]'
      );
      const ogImage = document.querySelector('meta[property="og:image"]');

      if (ogTitle) {
        ogTitle.setAttribute("content", `${options.agent.title} - ToolMarket`);
      }

      if (ogDescription) {
        ogDescription.setAttribute("content", options.agent.description);
      }

      if (ogImage) {
        ogImage.setAttribute("content", options.agent.image);
      }

      // Update Twitter Card tags
      const twitterTitle = document.querySelector(
        'meta[property="twitter:title"]'
      );
      const twitterDescription = document.querySelector(
        'meta[property="twitter:description"]'
      );
      const twitterImage = document.querySelector(
        'meta[property="twitter:image"]'
      );

      if (twitterTitle) {
        twitterTitle.setAttribute(
          "content",
          `${options.agent.title} - ToolMarket`
        );
      }

      if (twitterDescription) {
        twitterDescription.setAttribute("content", options.agent.description);
      }

      if (twitterImage) {
        twitterImage.setAttribute("content", options.agent.image);
      }
    }
  }, [options.title, options.description, options.agent]);
}

// Helper function to generate page titles
export function generatePageTitle(
  pageName?: string,
  agentName?: string
): string {
  const baseTitle = "ToolMarket - AI Agent Marketplace";

  if (agentName) {
    return `${agentName} - AI Agent | ${baseTitle}`;
  }

  if (pageName) {
    return `${pageName} | ${baseTitle}`;
  }

  return baseTitle;
}

// Helper function to generate meta descriptions
export function generateMetaDescription(agent?: Agent): string {
  if (agent) {
    return `${agent.description} Rated ${agent.rating}/5 by ${
      agent.votes
    } users. ${
      agent.developer ? `Developed by ${agent.developer}.` : ""
    } Available on ToolMarket.`;
  }

  return "The premier marketplace for AI agents. Discover, deploy, and monetize intelligent automation solutions for smart contracts, DeFi, NFTs, and more.";
}
