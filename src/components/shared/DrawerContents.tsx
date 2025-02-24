import Divider from "@mui/material/Divider";
import ListItem from "@mui/material/ListItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import HomeIcon from "@mui/icons-material/Home";
import { routes } from "src/routes/routes";
import { PlaylistList } from "../playlist-list/PlaylistList";
import AudiotrackIcon from "@mui/icons-material/Audiotrack";
import { NavListItemButton } from "./NavListItemButton";
import { CreatePlaylistButton } from "../playlist-list/create-playlist/CreatePlaylistButton";
import { ListSubheader } from "@mui/material";
import { StyledList } from "./DrawerContents.styled";
import { AddTrackMenu } from "../add-tracks/AddTrackMenu";

export const DrawerContents = () => {
  return (
    <>
      {/* <Divider /> */}
      <StyledList>
        <ListItem>
          <NavListItemButton to={routes.app.root}>
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
          <NavListItemButton to={routes.app.allTracks.root}>
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
        <AddTrackMenu />
      </StyledList>
      <Divider />
      <ListSubheader>Playlists</ListSubheader>
      <CreatePlaylistButton />
      <PlaylistList />
    </>
  );
};
