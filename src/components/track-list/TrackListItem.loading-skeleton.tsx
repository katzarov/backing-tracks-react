import { FC } from "react";
import { Skeleton, SxProps, Theme } from "@mui/material";
import { TrackListItem } from "./TrackListItem";
import { TrackInstrument, TrackType } from "../add-tracks/interface";
import { ITrackListItemProps } from "./TrackListItem";

const trackListItemMockProps: ITrackListItemProps = {
  index: 1,
  data: {
    id: 1,
    resourceId: "1",
    duration: 1,
    regions: [],
    trackInstrument: TrackInstrument.GUITAR,
    trackType: TrackType.BACKING,
    createdDate: new Date(),
    updatedDate: new Date(),
    meta: {
      spotifyUri: "uri",
      createdDate: new Date(),
      updatedDate: new Date(),
      albumArt: {
        small: { url: "", width: 60, height: 60 },
        medium: { url: "", width: 60, height: 60 },
        large: { url: "", width: 60, height: 60 },
      },
      artist: {
        spotifyUri: "uri",
        artistName: "artistName",
        createdDate: new Date(),
        updatedDate: new Date(),
      },
      trackName: "trackName",
    },
  },
  trackItemClickRouteNavigateTo: (trackId: string) => trackId,
};

interface ITrackListItemLoadingSkeletonProps {
  sx?: SxProps<Theme>;
}

// https://mui.com/material-ui/react-skeleton/#inferring-dimensions
export const TrackListItemLoadingSkeleton: FC<
  ITrackListItemLoadingSkeletonProps
> = ({ sx }) => {
  return (
    <Skeleton variant="rounded" width={"100%"} sx={{ ...sx }}>
      <TrackListItem {...trackListItemMockProps} />
    </Skeleton>
  );
};
