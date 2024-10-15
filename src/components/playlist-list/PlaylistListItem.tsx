import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { routes } from "src/routes/routes";
import { NavListItemButton } from "../shared/NavListItemButton";

interface IPlaylistListItemProps {
  id: number;
  name: string;
  description: string;
}

export const PlaylistListItem: FC<IPlaylistListItemProps> = ({
  id,
  name,
  // description,
}) => {
  return (
    <ListItem
      disablePadding
      alignItems="center"
      sx={{ width: "100%" }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="edit playlist"
          onClick={() => console.log(`click playlist ${id} TODO open menu`)}
        >
          <MoreVertIcon />
        </IconButton>
      }
    >
      <NavListItemButton
        to={routes.app.playlist.id(id.toString())}
        replace // we want to replace and not stack multiple track/playlist changes in the history
      >
        <ListItemText primary={name} sx={{ width: "100%" }} />
      </NavListItemButton>
    </ListItem>
  );
};
