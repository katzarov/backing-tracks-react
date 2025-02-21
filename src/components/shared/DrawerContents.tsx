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
import { CreatePlaylistButton } from "../playlist-list/create-playlist/CreatePlaylistButton";
import { ListSubheader } from "@mui/material";

export const DrawerContents = () => {
  const logoutWithRedirect = async () =>
    await authClient.logoutWithRedirect(
      `${window.location.origin}${routes.logoutUserInitiated}`
    );

  return (
    <>
      <List>
        <ListItem>
          <NavListItemButton
            to={routes.app.root}
            sx={(theme) => ({ py: theme.spacing(1) })}
          >
            <ListItemIcon>
              <HomeIcon />
            </ListItemIcon>
            <ListItemText
              primary="Home"
              slotProps={{
                primary: {
                  variant: "primaryBold",
                },
              }}
            />
          </NavListItemButton>
        </ListItem>
        <ListItem>
          <NavListItemButton
            to={routes.app.allTracks.root}
            sx={(theme) => ({ py: theme.spacing(1) })}
          >
            <ListItemIcon>
              <AudiotrackIcon />
            </ListItemIcon>
            <ListItemText
              primary="All Tracks"
              slotProps={{
                primary: {
                  variant: "primaryBold",
                },
              }}
            />
          </NavListItemButton>
        </ListItem>
        <ListItem>
          {/* TODO impl search */}
          <ListItemButton disabled sx={(theme) => ({ py: theme.spacing(1) })}>
            <ListItemIcon>
              <SearchIcon />
            </ListItemIcon>
            <ListItemText
              primary="Search"
              slotProps={{
                primary: {
                  variant: "primaryBold",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
        <ListItem>
          <ListItemButton
            onClick={logoutWithRedirect}
            sx={(theme) => ({ py: theme.spacing(1) })}
          >
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemText
              primary="Logout"
              slotProps={{
                primary: {
                  variant: "primaryBold",
                },
              }}
            />
          </ListItemButton>
        </ListItem>
      </List>
      <Divider />
      <ListSubheader>Playlists</ListSubheader>
      <CreatePlaylistButton />
      <PlaylistList />
    </>
  );
};
