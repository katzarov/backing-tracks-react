import { useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import { authClient } from "@lib/auth";
import { Box, Button, Container, Stack, Typography } from "@mui/material";
import { queryParams, routes } from "./routes";
import { Alert } from "src/components/shared/Alert";
import { useEffectOnce } from "src/hooks/useEffectOnce";
import { AppLogo } from "@src/components/shared/AppLogo";

// TODO: should check the auth state and show the correct button "login" or "go to app", or just redirect to the app.
export const Login = () => {
  const navigate = useNavigate();
  const [searchParams, setSearchParams] = useSearchParams();
  const [logoutReason, setLogoutReason] = useState<string | null>(null);
  const [showLoggingInMessage, setShowLoggingInMessage] = useState(false);

  const handleLoginClick = async () => {
    setShowLoggingInMessage(true);

    const isAuthenticated = await authClient.isAuthenticated();
    if (isAuthenticated) {
      navigate(routes.app.root);
      return;
    }

    await authClient.loginWithRedirect();
  };

  useEffectOnce(() => {
    // TODO check if user was being redirected here by auth0 and is actually logged out or not.
    // Should call the auth0 lib to see if there are still valid credentials stored, but this simple naive check for now will do.
    if (document.referrer === `${location.origin}/`) {
      const logoutReason = searchParams.get(queryParams.logout.key);
      setLogoutReason(logoutReason);
    }

    searchParams.delete(queryParams.logout.key);
    setSearchParams({ ...searchParams });
  });

  const getAlertComponent = () => {
    if (logoutReason === queryParams.logout.value.userInitiated) {
      return (
        <Box sx={{ position: "absolute", width: "20rem", top: 20, right: 20 }}>
          <Alert message="Successfully logged out." severity="success" />
        </Box>
      );
    }

    if (logoutReason === queryParams.logout.value.auth0Initiated) {
      return (
        <Box sx={{ position: "absolute", width: "20rem", top: 20, right: 20 }}>
          <Alert message="Please login again." severity="info" />
        </Box>
      );
    }

    return null;
  };

  return (
    <>
      {getAlertComponent()}

      <Container maxWidth="xs">
        <Stack
          direction="column"
          spacing={4}
          sx={{ height: "80vh" }}
          // alignItems="center"
          justifyContent="center"
        >
          <Stack
            direction="row"
            spacing={2}
            alignItems="center"
            // justifyContent="center"
            sx={(theme) => ({
              borderBottom: `1px solid ${theme.palette.common.accent}`,
            })}
          >
            <AppLogo sx={{ width: 80, height: 80 }} />

            <Typography variant="h5" gutterBottom>
              Backing Tracks
            </Typography>
          </Stack>

          <Typography variant="body1" textAlign="justify" gutterBottom>
            A place to help me organise all my backing tracks featuring an
            advanced audio player that lets me quickly jump to different parts
            of a track or change the pitch and speed of the track, and etc.
          </Typography>

          <Button
            size="large"
            variant="contained"
            onClick={handleLoginClick}
            loading={showLoggingInMessage}
            loadingIndicator="Logging in..."
          >
            Login with Auth0
          </Button>
        </Stack>
      </Container>
    </>
  );
};
