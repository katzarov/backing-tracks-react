import Box from "@mui/material/Box";
import { Drawer } from "./Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Player } from "./Player";
import { TrackList } from "./TrackList";
import { Outlet } from "react-router-dom";

const drawerWidth = 240;

export const Layout = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div">
            Permanent drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer drawerWidth={drawerWidth} />
      <Box
        component="main"
        sx={{ flexGrow: 1, bgcolor: "background.default", p: 3 }}
      >
        <Toolbar />
        <Outlet />
        <Player />
        <TrackList />
      </Box>
    </Box>
  );
};
