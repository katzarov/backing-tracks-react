import { Auth0Client, Auth0ClientOptions } from "@auth0/auth0-spa-js";
import { authConfig } from "src/config/auth";

// let the app depend on this instead of on Auth0 lib directly, as I might change to a different auth provider in the future.
class AuthClient {
  private authClient: Auth0Client;

  constructor(authConfig: Auth0ClientOptions) {
    this.authClient = new Auth0Client(authConfig);
  }

  async isAuthenticated() {
    try {
      await this.authClient.getTokenSilently();
      return true;
    } catch (e) {
      return false;
    }
  }

  getUser() {
    return this.authClient.getUser();
  }

  loginWithRedirect() {
    // todo pass redirect url
    return this.authClient.loginWithRedirect();
  }

  /**
   * After a redirect back to our app (after a login attempt), this gets the params from the url and completes the code grant flow.
   * (Note, it strips the url params from the url, so bare in mind when it comes to react strict mode)
   * @throws {Error} when invalid url params
   */
  handleRedirectCallback() {
    return this.authClient.handleRedirectCallback();
  }

  /**
   *
   * Fetches a new token if necessary and caches it - auth0 lib caches it.
   * @throws {Error} login_required message when can't login silently
   *
   */
  getTokenSilently() {
    return this.authClient.getTokenSilently();
  }

  /**
   *
   * Logouts with a redirect.
   *
   * @param {string} redirectUrl - where to be redirected after the redirect to auth0's /v2/logout
   */
  logoutWithRedirect(redirectUrl: string) {
    return this.authClient.logout({
      logoutParams: {
        returnTo: redirectUrl,
      },
    });
  }
}

export type { Auth0ClientOptions as AuthClientOptions };

export const authClient = new AuthClient(authConfig);
