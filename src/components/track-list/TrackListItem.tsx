import { Link } from "react-router-dom";
import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { formatFromSeconds } from "../../utils/utils";
import { ITrackResponseDto } from "../../store/api/tracks";
import { usePopover } from "../../hooks/usePopover";
import { TrackListItemMenu } from "./item-menu/TrackListItemMenu";
import { Avatar, ListItemAvatar } from "@mui/material";

interface ITrackListItemProps {
  index: number;
  data: ITrackResponseDto;
  trackItemClickRouteNavigateTo: (trackUri: string) => string;
}

export const TrackListItem: FC<ITrackListItemProps> = ({
  index,
  data,
  trackItemClickRouteNavigateTo,
}) => {
  const {
    popoverAnchorElement,
    shoulOpenPopover,
    handleOpenPopover,
    handleClosePopover,
  } = usePopover();

  return (
    <ListItem
      disablePadding
      alignItems="center"
      sx={{ width: "100%" }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="edit track"
          onClick={handleOpenPopover}
        >
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton
        component={Link}
        to={trackItemClickRouteNavigateTo(data.resourceId)}
        replace // we want to replace and not stack multiple track/playlist changes in the history
      >
        <ListItemText primary={index + 1} sx={{ width: 50 }} />
        <ListItemAvatar>
          <Avatar variant="square" src={data.meta.albumArt.small?.url} />
        </ListItemAvatar>
        <ListItemText
          primary={data.meta.trackName}
          secondary={data.meta.artist.artistName}
          sx={{ width: "100%" }}
        />
        <ListItemText secondary={data.trackType} sx={{ width: 100 }} />
        <ListItemText
          secondary={formatFromSeconds(data.duration)}
          sx={{ width: 50 }}
        />
      </ListItemButton>
      <TrackListItemMenu
        trackId={data.id}
        resourceId={data.resourceId}
        trackName={data.meta.trackName}
        artistName={data.meta.artist.artistName}
        playlists={data.playlists}
        popoverAnchorElement={popoverAnchorElement}
        shoulOpenPopover={shoulOpenPopover}
        handleClosePopover={handleClosePopover}
      />
    </ListItem>
  );
};
