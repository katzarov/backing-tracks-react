import { defineConfig, mergeConfig } from "vitest/config";
import { playwright } from "@vitest/browser-playwright";
import viteConfig from "./vite.config.ts";

export default mergeConfig(
  viteConfig,
  defineConfig({
    test: {
      // globals: true,
      // environment: "node",
      setupFiles: ["./test/vitest.setup.ts"],
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
            viewport: { width: 1280, height: 720 },
            // can override like that just for this browser
            // provider: playwright({
            //   launchOptions: {
            //     args: ["--autoplay-policy=no-user-gesture-required"],
            //     // slowMo: 100 cool to know
            //   },
            // }),
          },
          {
            browser: "webkit",
            viewport: { width: 1280, height: 720 },
          },
        ],
        // todo launch options to allow audio to start without user intercation for webkit and chrome ??
        expect: {
          toMatchScreenshot: {
            comparatorName: "pixelmatch",
            comparatorOptions: {
              // 0-1, how different can colors be?
              threshold: 0.1,
              // 1% of pixels can differ
              allowedMismatchedPixelRatio: 0.01,
            },
          },
        },
      },
      coverage: {
        provider: "istanbul",
        reporter: ["html", "text-summary"], // ['text', 'html', 'clover', 'json']
      },
    },
  }),
);
