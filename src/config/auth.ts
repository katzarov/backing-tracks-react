import { AuthClientOptions } from "@lib/auth";
import { routes } from "src/routes/routes";

const env = {
  domain: import.meta.env.VITE_AUTH0_DOMAIN,
  clientId: import.meta.env.VITE_AUTH0_CLIENT_ID,
  audience: import.meta.env.VITE_AUTH0_AUDIENCE,
};

export const authConfig: AuthClientOptions = {
  domain: env.domain,
  clientId: env.clientId,
  authorizationParams: {
    audience: env.audience,
    redirect_uri: `${window.location.origin}${routes.callback}`,
    // useRefreshTokens: true,
  },
  cacheLocation: "localstorage",
};
