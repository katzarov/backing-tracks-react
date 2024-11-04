import { Link } from "react-router-dom";
import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { convertIntToString, formatFromSeconds } from "../../utils/utils";
import { ITrackResponseDto } from "../../store/api/tracks";
import { usePopover } from "../../hooks/usePopover";
import { TrackListItemMenu } from "./item-menu/TrackListItemMenu";
import { Avatar, Box, ListItemAvatar, ListItemIcon } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAppDispatch, useAppSelector } from "src/store";
import { selectTrackId } from "src/store/slices/player";
import { userEventClickTrack } from "src/store/extraActions";

interface ITrackListItemProps {
  index: number;
  data: ITrackResponseDto;
  trackItemClickRouteNavigateTo: (trackId: string) => string;
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

  // TODO: this good for performance ?
  const trackId = useAppSelector(selectTrackId);
  const dispatch = useAppDispatch();

  const clickHandler = () => {
    // todo also pass the playlist id
    dispatch(userEventClickTrack(data.id));
  };

  // TODO: also check if playlist is same
  const isBeingPlayed = trackId === data.id;

  // TODO: redo layout in Grid2
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
        onClick={clickHandler}
        component={Link}
        to={trackItemClickRouteNavigateTo(convertIntToString(data.id))}
        replace // we want to replace and not stack multiple track/playlist changes in the history
      >
        <Box width={"3rem"}>
          {isBeingPlayed ? (
            <ListItemIcon>
              <VolumeUpIcon fontSize="small" />
            </ListItemIcon>
          ) : (
            <ListItemText primary={index + 1} sx={{ width: 50 }} />
          )}
        </Box>
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
        popoverAnchorElement={popoverAnchorElement}
        shoulOpenPopover={shoulOpenPopover}
        handleClosePopover={handleClosePopover}
      />
    </ListItem>
  );
};
