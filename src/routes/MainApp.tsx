import Box from "@mui/material/Box";
import { Drawer } from "../components/shared/Drawer";
import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { Player } from "../components/player/Player";
import { TrackList } from "../components/track-list/TrackList";
import { Outlet } from "react-router-dom";
import { AddTrackMenu } from "../components/add-tracks/AddTrackMenu";

const drawerWidth = 240;

export const MainApp = () => {
  return (
    <Box sx={{ display: "flex" }}>
      <AppBar
        position="fixed"
        sx={{ width: `calc(100% - ${drawerWidth}px)`, ml: `${drawerWidth}px` }}
      >
        <Toolbar>
          <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
            Backing Tracks
          </Typography>
          <AddTrackMenu />
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
