import { authClient } from "@lib/auth";
import { Button } from "@mui/material";
import { useNavigate, useSearchParams } from "react-router-dom";
import { queryParams, routes } from "./routes";

export const Login = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  const logoutUserInitiated =
    searchParams.get(queryParams.logout.key) ===
    queryParams.logout.value.userInitiated;

  // TODO: strip url query params because we dont want user to refresh the page and still get the logout message.

  const handleLoginClick = async () => {
    const isAuthenticated = await authClient.isAuthenticated();
    if (isAuthenticated) {
      navigate(routes.app.root);
      return;
    }

    await authClient.loginWithRedirect();
  };

  return (
    <>
      {logoutUserInitiated && "Successfully logged out."}
      <Button onClick={handleLoginClick}>Login</Button>
    </>
  );
};
