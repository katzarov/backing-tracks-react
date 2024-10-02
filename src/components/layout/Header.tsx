import { Box, IconButton, lighten, Toolbar, Typography } from "@mui/material";
import { AddTrackMenu } from "../add-tracks/AddTrackMenu";
import MenuIcon from "@mui/icons-material/Menu";
import { FC } from "react";

interface IHeaderProps {
  handleDrawerToggle: () => void;
}
export const Header: FC<IHeaderProps> = ({ handleDrawerToggle }) => {
  return (
    <Box
      component="header"
      sx={(theme) => ({
        background: lighten(theme.palette.background.paper, 0.2),
        flexShrink: 0,
      })}
    >
      <Toolbar>
        <IconButton
          color="inherit"
          aria-label="open drawer"
          edge="start"
          onClick={handleDrawerToggle}
          sx={{ mr: 2, display: { sm: "none" } }}
        >
          <MenuIcon />
        </IconButton>
        <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
          Backing Tracks
        </Typography>
        <AddTrackMenu />
      </Toolbar>
    </Box>
  );
};
