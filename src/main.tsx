import React from "react";
import ReactDOM from "react-dom/client";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline } from "@mui/material";
import { authConfig } from "./config/auth-config.ts";
import { Auth0Context, Auth0Provider } from "@auth0/auth0-react";
import { theme } from "./config/theme.ts";
import { AppWithAuthGuard } from "./AppWithAuthGuard.tsx";
import { store } from "./store/index.ts";
import { Provider } from "react-redux";

// https://gist.github.com/adamjmcgrath/0ed6a04047aad16506ca24d85f1b2a5c
// TODO Move to the (non-react) auth0 js sdk.
const deferred = (() => {
  // @ts-expect-error see todo above
  const props = {} as { promise: Promise<uknown>; resolve: uknown };
  props.promise = new Promise((resolve) => (props.resolve = resolve));
  return props;
})();

export const getAccessTokenSilently = async () => {
  const getToken = await deferred.promise;
  return getToken();
};

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme} defaultMode={"system"}>
      <CssBaseline />
      <Auth0Provider {...authConfig}>
        <Auth0Context.Consumer>
          {({ getAccessTokenSilently }) => {
            deferred.resolve(getAccessTokenSilently);
            return (
              <Provider store={store}>
                <AppWithAuthGuard />
              </Provider>
            );
          }}
        </Auth0Context.Consumer>
      </Auth0Provider>
    </CssVarsProvider>
  </React.StrictMode>
);
/**
 * Stuff that strict mode breaks, but that should be fine on prod:
 * - breaks form field autofocus when modal is opened initally https://github.com/mui/material-ui/issues/33004
 */

/**
 *
 * TODO:
 *
 *
 * GENERAL:
 * - do intl. (incl the form errors messages)
 * - do keyboard autofocus
 * - check focus and make sure adhere to a11y standards https://www.w3.org/WAI/ARIA/apg/patterns/dialog-modal/
 * - move all mui imports to named.
 * - https://vitejs.dev/guide/features.html#transpile-only https://github.com/fi3ework/vite-plugin-checker ?
 *
 *
 * ADD TRACKS:
 * - paste clipboard url with button click
 * - impl manually enter track details step
 * - do better with forms https://formik.org/docs/api/useField
 * - stepper => optimistic progress bar with hidden step names ?
 * - after YT link is pasted show a preview of the YT clip to confirm its the correct link ?
 * - debounce search input
 * - at end show confirmation step ?
 *
 *
 * PLAYER:
 * - support spacebar play pause and other DAW like keyboard shortcuts
 * - save streamed/downloaded tracks to indexedDB ?
 * - ability to change track speed/pitch. Or precompute/ondemand different track speeds/pitches on server cause higher quality probably... investigate.
 * - create waveform skeleton
 * - on app startup (unless a specific track route) preload the last played track - keep that in store - add redux persist
 *
 *
 */
