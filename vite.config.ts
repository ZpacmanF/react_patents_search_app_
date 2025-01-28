import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";

export default defineConfig({
  plugins: [react()],
  base: "/react_patents_search_app_/",
  optimizeDeps: {
    exclude: ["lucide-react"],
  },
});
