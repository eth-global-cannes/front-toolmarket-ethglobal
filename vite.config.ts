import tailwindcss from "@tailwindcss/vite";
import { tanstackRouter } from "@tanstack/router-plugin/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [tanstackRouter(), react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
  },
  build: {
    // Optimize bundle size
    rollupOptions: {
      output: {
        manualChunks: {
          // Separate vendor chunks
          vendor: ["react", "react-dom"],
          ui: ["lucide-react", "framer-motion"],
          // Split large libraries
          utils: ["@/lib/utils", "@/lib/design-system"],
        },
      },
    },
    // Enable minification
    minify: "terser",
    // Optimize chunk size
    chunkSizeWarningLimit: 1000,
    // Enable source maps for production debugging
    sourcemap: false,
  },
  server: {
    host: true, // Allow external connections
    port: 5173,
    allowedHosts: [
      "localhost",
      "127.0.0.1",
      "2fc9-83-144-23-155.ngrok-free.app",
      // Add more specific ngrok hosts as needed
      ".ngrok-free.app",
      ".ngrok.io",
      ".ngrok.app",
    ],
  },
});
