import tailwindcss from "@tailwindcss/vite";
import react from "@vitejs/plugin-react-swc";
import { defineConfig } from "vite";

// https://vite.dev/config/
export default defineConfig({
  plugins: [react(), tailwindcss()],
  resolve: {
    alias: {
      "@": "/src",
    },
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
