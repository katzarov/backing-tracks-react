import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemText from "@mui/material/ListItemText";
import { routes } from "src/routes/routes";
import { NavListItemButton } from "../shared/NavListItemButton";
import { convertIntToString } from "@src/utils/utils";

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
    <ListItem alignItems="center" sx={{ width: "100%" }}>
      <NavListItemButton
        to={routes.app.playlist.id(convertIntToString(id))}
        replace // we want to replace and not stack multiple track/playlist changes in the history
        sx={(theme) => ({ py: theme.spacing(0.5) })} // TODO: wait... do I actually need to call theme.spacing myself ? or it is going to be used if i just pass a number here like: py: 0.5
      >
        <ListItemText primary={name} sx={{ width: "100%" }} />
      </NavListItemButton>
    </ListItem>
  );
};
