import List from "@mui/material/List";
import { ITrackResponseDto } from "../../store/api/tracks";
import { TrackListItem } from "./TrackListItem";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import { TrackListItemLoadingSkeleton } from "./TrackListItem.loading-skeleton";

interface ITrackListProps {
  sx?: SxProps<Theme>;
  data: ITrackResponseDto[] | undefined;
  isLoading: boolean;
  trackItemClickRouteNavigateTo: (trackId: string) => string;
}

// TODO: virtualize
export const TrackList: FC<ITrackListProps> = ({
  sx,
  data,
  isLoading,
  trackItemClickRouteNavigateTo,
}) => {
  if (isLoading)
    return (
      <List dense sx={{ width: "100%", px: 4, ...sx }}>
        <TrackListItemLoadingSkeleton sx={{ mt: 2 }} />
        <TrackListItemLoadingSkeleton sx={{ mt: 2 }} />
        <TrackListItemLoadingSkeleton sx={{ mt: 2 }} />
        <TrackListItemLoadingSkeleton sx={{ mt: 2 }} />
      </List>
    );

  const trackList = data?.map((item, index) => {
    return (
      <TrackListItem
        key={item.id}
        index={index}
        data={item}
        trackItemClickRouteNavigateTo={trackItemClickRouteNavigateTo}
      />
    );
  });

  return (
    <List dense sx={{ width: "100%", ...sx }}>
      {trackList}
    </List>
  );
};
