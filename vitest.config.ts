import { defineConfig, mergeConfig } from "vitest/config";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // globals: true,
      environment: "node",
      setupFiles: ["./test/vitest.setup.js"],
      browser: {
        enabled: true,
        provider: "playwright",
        // https://vitest.dev/guide/browser/playwright TODO configure
        instances: [
          {
            browser: "chromium",
            launch: { args: ["--autoplay-policy=no-user-gesture-required"] },
          },
          { browser: "webkit" },
        ],
        // todo launch options to allow audio to start without user intercation for webkit and chrome ??
      },
      coverage: {
        provider: "istanbul", // or 'v8' with newest vitest => v8 now mathes istanbul ?
        reporter: ["html", "text-summary"], // ['text', 'html', 'clover', 'json']
      },
    },
  })
);
