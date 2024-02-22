import { Auth0ProviderOptions } from "@auth0/auth0-react";

const config = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

// Please see https://auth0.github.io/auth0-react/interfaces/Auth0ProviderOptions.html
// for a full list of the available properties on the provider
export const authConfig: Auth0ProviderOptions = {
  domain: config.domain,
  clientId: config.clientId,
  authorizationParams: {
    audience: config.audience,
    redirect_uri: window.location.origin,
  },
  cacheLocation: "localstorage",
};
