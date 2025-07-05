import { lazy } from "react";

// Lazy load heavy components
export const LazyAgentDetailsView = lazy(() =>
  import("@/views/AgentDetailsView").then((module) => ({
    default: module.AgentDetailsView,
  }))
);

export const LazyFeedbackModal = lazy(() =>
  import("@/entities/Details/components/FeedbackModal").then((module) => ({
    default: module.FeedbackModal,
  }))
);

export const LazyFooter = lazy(() =>
  import("@/entities/Dashboard/components/Footer").then((module) => ({
    default: module.Footer,
  }))
);

// Loading fallback component
export function ComponentLoader({ className = "" }: { className?: string }) {
  return (
    <div
      className={`animate-pulse bg-gradient-to-br from-orange-100 to-orange-50 rounded-lg ${className}`}
    >
      <div className="h-full w-full bg-orange-200/30 rounded-lg"></div>
    </div>
  );
}
