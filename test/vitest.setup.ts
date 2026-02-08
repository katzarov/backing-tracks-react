// https://github.com/vitest-community/vitest-browser-react?tab=readme-ov-file#vitest-browser-react
import "vitest-browser-react";

import { vi } from "vitest";
import { afterEach, beforeAll, afterAll } from "vitest";
import { worker } from "./utils";

// import * as auth from "@lib/auth";
// vi.mock("@lib/auth", { spy: true });
// vi.mocked(auth.authClient.getTokenSilently).mockResolvedValue('t') ?

// import * as auth from "@lib/auth";
// const spy = vi.spyOn(auth, "authClient").mockReturnValue({ authClient: {} }); ?

// @ts-expect-error we are mocking the entire module but not actually providing an impl that adheres to its interface. We only mocked what we need thus far.
// i can also import the original module and use it but that doesnt seem to work for some reason
// also i can auto mock the entire module but that does seem to work
// also i can spy on the exports and not replace the entire module but that doesnt seem to work
// https://vitest.dev/guide/mocking/modules.html#mocking-a-module
// https://vitest.dev/guide/browser/component-testing.html#_4-mock-external-dependencies

// idk - at any rate, I will setup some simple di in this case and will create the correct obj based on a vite env var, which should be treeshaked in prod build https://vite.dev/guide/env-and-mode
// kinda like the s3 env i have except i need to fix it casue the obsolete strategy in prod is not actually tree shaked rn

// I have a feeling this might be failing on webkit in test ui mode.
vi.mock(import("@lib/auth"), () => ({
  authClient: {
    getTokenSilently: async () => Promise.resolve("mocked_token"),
  },

  // withAuthenticationRequired: vi.fn(
  //   ({ user }) => `<div>User: ${user.name}</div>`,
  // ),
}));

// https://vitest.dev/guide/browser/component-testing.html#testing-async-components-with-data-fetching
beforeAll(() => worker.start());
afterEach(() => worker.resetHandlers());
afterAll(() => worker.stop());

// https://github.com/muratkeremozcan/pact-js-example-react-consumer/blob/main/src/test-utils/vitest-utils/vitest.setup.ts
// we need all this so msw works without flake in headless mode

// beforeAll(async () => {
//   await worker.start({ onUnhandledRequest: "bypass" });
//   if ("serviceWorker" in navigator) {
//     await waitForServiceWorkerControl();
//   }
// });

// afterAll(() => {
//   // If you want to stop the worker eventually, do it here:
//   worker.stop();
// });

// async function waitForServiceWorkerControl() {
//   // If the page is already controlled, great
//   if (navigator.serviceWorker.controller) return;

//   // Otherwise, wait up to ~2 seconds for it
//   let attempts = 0;
//   while (!navigator.serviceWorker.controller && attempts < 20) {
//     await new Promise((r) => setTimeout(r, 100));
//     attempts++;
//   }
// }
