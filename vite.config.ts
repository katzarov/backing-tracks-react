/// <reference types="vitest" />
// TODO unclear if i need this or not
// /// <reference types="vitest/browser" />
import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import viteTsconfigPaths from "vite-tsconfig-paths";

// https://vitejs.dev/config/
export default defineConfig({
  server: {
    port: 8080,
    strictPort: true,
  },
  preview: {
    port: 8080,
    strictPort: true,
  },
  plugins: [react(), viteTsconfigPaths()],
});
