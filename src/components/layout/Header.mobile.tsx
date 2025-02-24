import { AppBar, IconButton, Toolbar } from "@mui/material";
import { AddTrackMenu } from "../add-tracks/AddTrackMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { FC } from "react";
import { AppLogo } from "../shared/AppLogo";

interface IHeaderMobileProps {
  handleDrawerToggle: () => void;
}

// todo fix up.
export const HeaderMobile: FC<IHeaderMobileProps> = ({
  handleDrawerToggle,
}) => {
  return (
    <AppBar component="header" position="static">
      <Toolbar sx={{ mx: 2 }}>
        <IconButton
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
        >
          <MenuIcon />
        </IconButton>
        <AppLogo sx={{ mr: "auto" }} />
        <AddTrackMenu />
      </Toolbar>
    </AppBar>
  );
};
