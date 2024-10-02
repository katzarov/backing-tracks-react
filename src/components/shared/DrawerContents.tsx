import List from "@mui/material/List";
import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import SearchIcon from "@mui/icons-material/Search";
import LogoutIcon from "@mui/icons-material/Logout";
import { routes } from "src/routes/routes";
import { authClient } from "@lib/auth";
import { PlaylistList } from "../playlist-list/PlaylistList";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { NavListItemButton } from "./NavListItemButton";

export const DrawerContents = () => {
  const logoutWithRedirect = async () =>
    await authClient.logoutWithRedirect(
      `${window.location.origin}${routes.logoutUserInitiated}`
    );

  return (
    <>
      <List>
        <ListItem>
          <NavListItemButton to={routes.app.root}>
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText primary="Home" />
          </NavListItemButton>
        </ListItem>
        <ListItem>
          <NavListItemButton to={routes.app.allTracks.root}>
            <ListItemIcon>
              <AudiotrackIcon />
            </ListItemIcon>
            <ListItemText primary="All Tracks" />
          </NavListItemButton>
        </ListItem>
        <ListItem>
          {/* TODO impl search */}
          <ListItemButton disabled>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText primary="Search" />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton onClick={logoutWithRedirect}>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText primary="Logout" />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      {/* TODO */}
      Playlists | add playlist btn
      <PlaylistList />
    </>
  );
};
