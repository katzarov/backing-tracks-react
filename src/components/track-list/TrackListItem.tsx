import { Link } from "react-router-dom";
import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import { convertIntToString, formatFromSeconds } from "../../utils/utils";
import { ITrackResponseDto } from "../../store/api/tracks";
import { usePopover } from "../../hooks/usePopover";
import { TrackListItemMenu } from "./item-menu/TrackListItemMenu";
import { Grid2 as Grid, ListItemIcon } from "@mui/material";
import VolumeUpIcon from "@mui/icons-material/VolumeUp";
import { useAppDispatch, useAppSelector } from "src/store";
import { selectTrackId } from "src/store/slices/player";
import { userEventClickTrack } from "src/store/extraActions";
import { TrackInfoListItem } from "../shared/TrackInfo.list-item";

export interface ITrackListItemProps {
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
          color="secondary"
          edge="end"
          aria-label="edit track"
          onClick={handleOpenPopover}
        >
          <MoreHorizIcon />
        </IconButton>
      }
    >
      <ListItemButton
        onClick={clickHandler}
        selected={isBeingPlayed}
        component={Link}
        to={trackItemClickRouteNavigateTo(convertIntToString(data.id))}
        replace // we want to replace and not stack multiple track/playlist changes in the history
      >
        <Grid
          container
          width="100%"
          columns={12}
          rowSpacing={1}
          columnSpacing={{ xs: 2, sm: 8 }}
          alignItems="center"
        >
          <Grid
            size={{ xs: 12, sm: "grow" }}
            display="flex"
            alignItems="center"
            flexDirection="row"
          >
            {isBeingPlayed ? (
              <ListItemIcon
                color="secondary"
                sx={(theme) => ({
                  flexGrow: 0,
                  width: theme.spacing(10),
                  minWidth: theme.spacing(10),
                })}
              >
                <VolumeUpIcon fontSize="small" />
              </ListItemIcon>
            ) : (
              <ListItemText
                secondary={index + 1}
                sx={(theme) => ({
                  flexGrow: 0,
                  width: theme.spacing(10),
                  minWidth: theme.spacing(10),
                })}
              />
            )}
            <TrackInfoListItem
              imageSrc={data.meta.albumArt.small?.url}
              trackName={data.meta.trackName}
              artistName={data.meta.artist.artistName}
            />
          </Grid>
          <Grid size="auto">
            <ListItemText secondary={data.trackType} />
          </Grid>
          <Grid size="auto">
            <ListItemText secondary={formatFromSeconds(data.duration)} />
          </Grid>
        </Grid>
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
