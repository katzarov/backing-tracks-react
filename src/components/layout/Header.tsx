import { Box, Toolbar } from "@mui/material";
import { AddTrackMenu } from "../add-tracks/AddTrackMenu";
import { AppLogo } from "../shared/AppLogo";

export const Header = () => {
  return (
    <Box component="header">
      <Toolbar sx={{ paddingRight: 1 }}>
        <AppLogo sx={{ mr: "auto" }} />
        <AddTrackMenu />
      </Toolbar>
    </Box>
  );
};
