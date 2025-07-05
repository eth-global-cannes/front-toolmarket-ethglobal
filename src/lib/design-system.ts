// Design System - Color Tokens & Theme
export const designSystem = {
  colors: {
    // Primary Brand Colors
    primary: {
      50: "#fff7ed", // Very light orange
      100: "#ffedd5", // Light orange
      200: "#fed7aa", // Lighter orange
      300: "#fdba74", // Light orange
      400: "#fb923c", // Medium orange
      500: "#f97316", // Main brand orange
      600: "#ea580c", // Dark orange
      700: "#c2410c", // Darker orange
      800: "#9a3412", // Very dark orange
      900: "#7c2d12", // Darkest orange
    },

    // Neutral Colors (Grays)
    neutral: {
      0: "#ffffff", // Pure white
      50: "#fafafa", // Off white
      100: "#f5f5f5", // Very light gray
      200: "#e5e5e5", // Light gray
      300: "#d4d4d4", // Medium light gray
      400: "#a3a3a3", // Medium gray
      500: "#737373", // Dark gray
      600: "#525252", // Darker gray
      700: "#404040", // Very dark gray
      800: "#262626", // Almost black
      900: "#171717", // Near black
      950: "#0a0a0a", // Pure black
    },

    // Semantic Colors
    success: {
      50: "#f0fdf4",
      500: "#22c55e",
      600: "#16a34a",
    },

    warning: {
      50: "#fffbeb",
      500: "#f59e0b",
      600: "#d97706",
    },

    error: {
      50: "#fef2f2",
      500: "#ef4444",
      600: "#dc2626",
    },

    info: {
      50: "#eff6ff",
      500: "#3b82f6",
      600: "#2563eb",
    },
  },

  // Shadows
  shadows: {
    sm: "0 1px 2px 0 rgb(0 0 0 / 0.05)",
    md: "0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1)",
    lg: "0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)",
    xl: "0 20px 25px -5px rgb(0 0 0 / 0.1), 0 8px 10px -6px rgb(0 0 0 / 0.1)",
  },

  // Border Radius
  radius: {
    sm: "0.25rem", // 4px
    md: "0.375rem", // 6px
    lg: "0.5rem", // 8px
    xl: "0.75rem", // 12px
    "2xl": "1rem", // 16px
    full: "9999px", // Fully rounded
  },

  // Typography
  typography: {
    fontFamily: {
      sans: ["Inter", "system-ui", "sans-serif"],
      mono: ["JetBrains Mono", "monospace"],
    },
    fontSize: {
      xs: "0.75rem", // 12px
      sm: "0.875rem", // 14px
      base: "1rem", // 16px
      lg: "1.125rem", // 18px
      xl: "1.25rem", // 20px
      "2xl": "1.5rem", // 24px
      "3xl": "1.875rem", // 30px
    },
  },

  // Spacing Scale
  spacing: {
    xs: "0.25rem", // 4px
    sm: "0.5rem", // 8px
    md: "1rem", // 16px
    lg: "1.5rem", // 24px
    xl: "2rem", // 32px
    "2xl": "3rem", // 48px
    "3xl": "4rem", // 64px
  },
} as const;

// CSS Custom Properties for dynamic theming
export const cssVariables = `
  :root {
    --color-primary-50: ${designSystem.colors.primary[50]};
    --color-primary-500: ${designSystem.colors.primary[500]};
    --color-primary-600: ${designSystem.colors.primary[600]};
    --color-primary-700: ${designSystem.colors.primary[700]};
    
    --color-neutral-0: ${designSystem.colors.neutral[0]};
    --color-neutral-50: ${designSystem.colors.neutral[50]};
    --color-neutral-100: ${designSystem.colors.neutral[100]};
    --color-neutral-200: ${designSystem.colors.neutral[200]};
    --color-neutral-300: ${designSystem.colors.neutral[300]};
    --color-neutral-500: ${designSystem.colors.neutral[500]};
    --color-neutral-600: ${designSystem.colors.neutral[600]};
    --color-neutral-700: ${designSystem.colors.neutral[700]};
    --color-neutral-800: ${designSystem.colors.neutral[800]};
    --color-neutral-900: ${designSystem.colors.neutral[900]};
    
    --shadow-sm: ${designSystem.shadows.sm};
    --shadow-md: ${designSystem.shadows.md};
    --shadow-lg: ${designSystem.shadows.lg};
  }
`;

// Utility functions for consistent color usage
export const getColor = (
  color: keyof typeof designSystem.colors,
  shade: number = 500
) => {
  return designSystem.colors[color][
    shade as keyof typeof designSystem.colors.primary
  ];
};

export const getBrandColor = (shade: number = 500) => {
  return designSystem.colors.primary[
    shade as keyof typeof designSystem.colors.primary
  ];
};
