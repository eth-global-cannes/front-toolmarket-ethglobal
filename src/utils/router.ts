export interface RouteParams {
  [key: string]: string | undefined;
}

export interface Route {
  path: string;
  view: string;
  params?: RouteParams;
}

export class Router {
  private routes: Map<string, string> = new Map();
  private currentRoute: Route | null = null;
  private listeners: Array<(route: Route) => void> = [];

  constructor() {
    // Define routes
    this.routes.set("/", "marketplace");
    this.routes.set("/agent/:id", "agent-details");

    // Listen to browser navigation
    window.addEventListener("popstate", this.handlePopState.bind(this));

    // Initialize current route
    this.parseCurrentRoute();
  }

  // Parse current URL and extract route info
  private parseCurrentRoute(): void {
    const path = window.location.pathname;
    const route = this.matchRoute(path);

    if (route) {
      this.currentRoute = route;
      this.notifyListeners();
    }
  }

  // Match URL path to defined routes
  private matchRoute(path: string): Route | null {
    for (const [pattern, view] of this.routes) {
      const params = this.extractParams(pattern, path);
      if (params !== null) {
        return {
          path: pattern,
          view,
          params,
        };
      }
    }

    // Default to marketplace if no match
    return {
      path: "/",
      view: "marketplace",
      params: {},
    };
  }

  // Extract parameters from URL path
  private extractParams(pattern: string, path: string): RouteParams | null {
    const patternParts = pattern.split("/");
    const pathParts = path.split("/");

    if (patternParts.length !== pathParts.length) {
      return null;
    }

    const params: RouteParams = {};

    for (let i = 0; i < patternParts.length; i++) {
      const patternPart = patternParts[i];
      const pathPart = pathParts[i];

      if (patternPart.startsWith(":")) {
        // Parameter
        const paramName = patternPart.slice(1);
        params[paramName] = pathPart;
      } else if (patternPart !== pathPart) {
        // Exact match required
        return null;
      }
    }

    return params;
  }

  // Handle browser back/forward navigation
  private handlePopState(): void {
    this.parseCurrentRoute();
  }

  // Navigate to a new route
  navigate(path: string, replace = false): void {
    const route = this.matchRoute(path);

    if (route) {
      this.currentRoute = route;

      if (replace) {
        window.history.replaceState(null, "", path);
      } else {
        window.history.pushState(null, "", path);
      }

      this.notifyListeners();
    }
  }

  // Get current route
  getCurrentRoute(): Route | null {
    return this.currentRoute;
  }

  // Subscribe to route changes
  subscribe(listener: (route: Route) => void): () => void {
    this.listeners.push(listener);

    // Return unsubscribe function
    return () => {
      const index = this.listeners.indexOf(listener);
      if (index > -1) {
        this.listeners.splice(index, 1);
      }
    };
  }

  // Notify all listeners of route changes
  private notifyListeners(): void {
    if (this.currentRoute) {
      this.listeners.forEach((listener) => listener(this.currentRoute!));
    }
  }

  // Helper method to build agent detail URL
  static buildAgentDetailUrl(agentId: number): string {
    return `/agent/${agentId}`;
  }

  // Helper method to build marketplace URL
  static buildMarketplaceUrl(): string {
    return "/";
  }
}

// Create singleton instance
export const router = new Router();
