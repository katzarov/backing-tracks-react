import { useNavigate } from "react-router-dom";
import { routes } from "./routes";
import { LoadingPage } from "src/components/shared/LoadingPage";
import { useAppDispatch } from "src/store";
import { setAuthenticated, setUserData } from "@slices/auth";
import { authClient } from "@lib/auth";
import { useEffectOnce } from "src/hooks/useEffectOnce";

export const Callback = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffectOnce(() => {
    (async (): Promise<void> => {
      try {
        await authClient.handleRedirectCallback();
        const userData = await authClient.getUser();
        dispatch(setAuthenticated(true));
        dispatch(setUserData({ userData: { name: userData!.name ?? null } }));
        navigate(routes.app.root);
      } catch (error) {
        // TODO: show error message, either pass via the url or redux
        navigate(routes.login);
      }
    })();
  });

  return <LoadingPage message="Logging you in..." />;
};
