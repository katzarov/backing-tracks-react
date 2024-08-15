import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { routes } from "./routes";
import { LoadingPage } from "src/containers/LoadingPage";
import { useAppDispatch } from "src/store";
import { setAuthenticated, setUserData } from "src/store/auth";
import { authClient } from "@lib/auth";

export const Callback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    (async (): Promise<void> => {
      try {
        await authClient.handleRedirectCallback();
        const userData = await authClient.getUser();
        dispatch(setAuthenticated(true));
        dispatch(setUserData({ userData: { name: userData!.name ?? null } }));
        navigate(routes.app.root);
      } catch (error) {
        // TODO: Errors in strict mode, because the second time react runs the effect, the code from the url is already stripped
        // TODO: show error message, either pass via the url or redux
        navigate(routes.login);
      }
    })();
  }, [navigate, dispatch]);

  return <LoadingPage message="Logging you in..." />;
};
