import react from "@vitejs/plugin-react";
import { defineConfig } from "vite";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 3000,
    proxy: {
      "/api": {
        target: "http://localhost:5000",
        rewrite: (path) => path.substring(4),
      },
      "/static": "http://localhost:5000",
    },
  },
  plugins: [react()],
});
