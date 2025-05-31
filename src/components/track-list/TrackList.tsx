import List from "@mui/material/List";
import { ITrackResponseDto } from "../../store/api/tracks";
import { TrackListItem } from "./TrackListItem";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";
import { TrackListItemLoadingSkeleton } from "./TrackListItem.loading-skeleton";
import { selectTrackId } from "@src/store/slices/player";
import { useAppSelector } from "@src/store";

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
  const trackId = useAppSelector(selectTrackId);

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
    // TODO-I think once we sync router state with redux. Add is playlist selected as well.
    const isSelected = trackId === item.id;
    return (
      <TrackListItem
        key={item.id}
        index={index}
        isSelected={isSelected}
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
