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
    trackInstrument: TrackInstrument.GUITAR,
    trackType: TrackType.BACKING,
    meta: {
      albumArt: {
        small: { url: "", width: 60, height: 60 },
        medium: { url: "", width: 60, height: 60 },
        large: { url: "", width: 60, height: 60 },
      },
      artist: { artistName: "artistName" },
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
