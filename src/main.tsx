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
// TODO get rid of this when swithing to Cognito. But if I do keep Auth0, they have a (non-react) js sdk, should switch to that.
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
 * get rid of auth0 react wrapper,..actually, remove the auth0 sdk and move to cognito
 *
 * support spacebar play pause and other keyboard shortcuts
 * read all discussions
 * https://github.com/katspaugh/wavesurfer.js/discussions/3545
 *
 *
 * do file streaming but first need to precompute the waveform peaks and have the duration be known
 *
 * save streamed/downoaded tracks to indexedDB ?
 *
 *
 * precompute different track speeds/pitches on server cause higher quality probably.. TODO investigate.
 *
 *
 * create waveform skeleton
 *
 * apperently React.FC is a good choice now
 * https://www.totaltypescript.com/you-can-stop-hating-react-fc
 * 
 * do intl.
 * 
 */
