import { FC } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import { IGenericCheckboxItem } from "src/hooks/useCheckboxListLogic";
import { IMergedTrackPlaylistsWithAllPlaylists } from "src/utils/playlist";

interface ISelectablePlaylistsProps {
  playlistsPreSelected: IMergedTrackPlaylistsWithAllPlaylists[];
  disableActions?: boolean;
  handleToggle: (id: IGenericCheckboxItem["id"]) => void;
}
export const SelectablePlaylists: FC<ISelectablePlaylistsProps> = ({
  playlistsPreSelected,
  disableActions = false,
  handleToggle,
}) => {
  return (
    <List sx={{ width: "100%", maxWidth: 360 }}>
      {playlistsPreSelected.map((item) => {
        const labelId = `checkbox-list-label-${item.name}`;

        return (
          <ListItem key={item.id} disablePadding>
            <ListItemButton
              role={undefined}
              disabled={disableActions}
              onClick={() => handleToggle(item.id)}
              dense
            >
              <ListItemIcon>
                <Checkbox
                  edge="start"
                  checked={item.selected}
                  tabIndex={-1}
                  disableRipple
                  inputProps={{ "aria-labelledby": labelId }}
                />
              </ListItemIcon>
              <ListItemText id={labelId} primary={item.name} />
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );
};
