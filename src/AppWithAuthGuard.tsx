import { withAuthenticationRequired } from "@auth0/auth0-react";
import { App } from "./App";

export const AppWithAuthGuard = withAuthenticationRequired(App);
