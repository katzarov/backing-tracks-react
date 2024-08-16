import { ComponentType, useEffect, FC, useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { LoadingPage } from "src/components/shared/LoadingPage";
import { routes } from "src/routes/routes";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  selectIsAuthenticated,
  setAuthenticated,
  setUserData,
} from "@slices/auth";
import { authClient } from "./authClient";

const minimumTimeToShowLoadingComponentForInMs = 200;

/**
 *
 * Use for routes that need to be protected.
 * Shows loading page while authentication status is figured out.
 * Redirects unauthenticated users to login page.
 */
export const withAuthenticationRequired = <P extends object>(
  Component: ComponentType<P>
  // options = {}
): FC<P> => {
  return function WithAuthenticationRequired(props: P): JSX.Element {
    const isAuthenticated = useAppSelector(selectIsAuthenticated);
    const [minimumSpinnerTimeElapsed, setMinimumSpinnerTimeElapsed] = useState<
      boolean | null
    >(null);
    const timeoutId = useRef<number | null>(null);
    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    useEffect(() => {
      if (isAuthenticated) return;

      // alternative way is to start showing the app optimistically first and then redirect to login route if necessary.
      setMinimumSpinnerTimeElapsed(false);
      timeoutId.current = setTimeout(
        () => setMinimumSpinnerTimeElapsed(true),
        minimumTimeToShowLoadingComponentForInMs
      );

      return () => {
        if (timeoutId.current !== null) {
          clearTimeout(timeoutId.current);
        }
      };
      // eslint-disable-next-line react-hooks/exhaustive-deps
    }, []);

    useEffect(() => {
      if (isAuthenticated) return;

      (async (): Promise<void> => {
        try {
          await authClient.getTokenSilently();
          const userData = await authClient.getUser();
          dispatch(setAuthenticated(true));
          dispatch(setUserData({ userData: { name: userData!.name ?? null } }));
        } catch (e) {
          // todo, what we should do is:
          // get the current url, show some msg to user, rdirect to auth0, on login there, redirct back to where we were
          dispatch(setAuthenticated(false));
          navigate(routes.logoutAuth0Initiated); // or pass the current url as query here, and get it on the login page and proceed from there.
        }
      })();
    }, [isAuthenticated, navigate, dispatch]);

    if (isAuthenticated && minimumSpinnerTimeElapsed !== false) {
      return <Component {...props} />;
    }

    // maybe pass a prop to Component and let it decide what loading component is neccassary instead of doing it here.
    return <LoadingPage message="Loading" />;
  };
};
