import type { Agent } from "@/types/agent";

const BOOKMARKS_KEY = "toolmarket_bookmarks";

export interface BookmarkedAgent {
  id: number;
  title: string;
  price: string;
  image: string;
  rating: number;
  votes: number;
  category?: string;
  isPurchased?: boolean;
  dateBookmarked: string;
}

// Get all bookmarked agents from localStorage
export const getBookmarkedAgents = (): BookmarkedAgent[] => {
  try {
    const bookmarks = localStorage.getItem(BOOKMARKS_KEY);
    return bookmarks ? JSON.parse(bookmarks) : [];
  } catch (error) {
    console.error("Error getting bookmarked agents:", error);
    return [];
  }
};

// Add an agent to bookmarks
export const addBookmark = (agent: Agent): void => {
  try {
    const bookmarks = getBookmarkedAgents();

    // Check if already bookmarked
    if (bookmarks.some((bookmark) => bookmark.id === agent.id)) {
      return;
    }

    const newBookmark: BookmarkedAgent = {
      id: agent.id,
      title: agent.title,
      price: agent.price || "0",
      image: agent.image,
      rating: agent.rating,
      votes: agent.votes,
      category: agent.category,
      isPurchased: agent.isPurchased,
      dateBookmarked: new Date().toISOString(),
    };

    bookmarks.push(newBookmark);
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch (error) {
    console.error("Error adding bookmark:", error);
  }
};

// Remove an agent from bookmarks
export const removeBookmark = (agentId: number): void => {
  try {
    const bookmarks = getBookmarkedAgents();
    const updatedBookmarks = bookmarks.filter(
      (bookmark) => bookmark.id !== agentId
    );
    localStorage.setItem(BOOKMARKS_KEY, JSON.stringify(updatedBookmarks));
  } catch (error) {
    console.error("Error removing bookmark:", error);
  }
};

// Check if an agent is bookmarked
export const isBookmarked = (agentId: number): boolean => {
  try {
    const bookmarks = getBookmarkedAgents();
    return bookmarks.some((bookmark) => bookmark.id === agentId);
  } catch (error) {
    console.error("Error checking bookmark status:", error);
    return false;
  }
};

// Clear all bookmarks
export const clearBookmarks = (): void => {
  try {
    localStorage.removeItem(BOOKMARKS_KEY);
  } catch (error) {
    console.error("Error clearing bookmarks:", error);
  }
};

// Convert BookmarkedAgent to Agent (for compatibility)
export const bookmarkToAgent = (bookmark: BookmarkedAgent): Agent => {
  return {
    id: bookmark.id,
    title: bookmark.title,
    price: bookmark.price,
    image: bookmark.image,
    rating: bookmark.rating,
    votes: bookmark.votes,
    category: bookmark.category,
    isPurchased: bookmark.isPurchased,
    description: `Bookmarked on ${new Date(
      bookmark.dateBookmarked
    ).toLocaleDateString()}`,
    longDescription: "This agent has been saved to your bookmarks.",
    developer: "Various",
    releaseDate: bookmark.dateBookmarked,
  };
};
