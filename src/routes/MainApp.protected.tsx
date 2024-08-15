import { withAuthenticationRequired } from "@lib/auth";
import { MainApp } from "./MainApp";

export const ProtectedMainApp = withAuthenticationRequired(MainApp);
