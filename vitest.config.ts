import { defineConfig, mergeConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
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
        // headless: true, // fixes the vitest vs code extension, it seems to be pikcing up this config
        provider: playwright({
          launchOptions: {
            args: ["--autoplay-policy=no-user-gesture-required"],
            // slowMo: 100 cool to know
          },
        }),
        // TODO
        // trace: {
        //   mode: "on",
        //   // the path is relative to the root of the project
        //   tracesDir: "./playwright-traces",
        // },
        // https://vitest.dev/guide/browser/playwright TODO configure
        instances: [
          {
            browser: "chromium",
            // can override like that just for this browser
            // provider: playwright({
            //   launchOptions: {
            //     args: ["--autoplay-policy=no-user-gesture-required"],
            //     // slowMo: 100 cool to know
            //   },
            // }),
          },
          { browser: "webkit" },
        ],
        // todo launch options to allow audio to start without user intercation for webkit and chrome ??
      },
      coverage: {
        provider: "istanbul",
        reporter: ["html", "text-summary"], // ['text', 'html', 'clover', 'json']
      },
    },
  }),
);
