import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";
import { ITrackResponseDto } from "../../store/api/tracks";
import { TrackListItem } from "./TrackListItem";
import { FC } from "react";
import { SxProps, Theme } from "@mui/material";

interface ITrackListProps {
  sx?: SxProps<Theme>;
  data: ITrackResponseDto[] | undefined;
  isLoading: boolean;
  trackItemClickRouteNavigateTo: (trackId: string) => string;
}

export const TrackList: FC<ITrackListProps> = ({
  sx,
  data,
  isLoading,
  trackItemClickRouteNavigateTo,
}) => {
  // TODO skeleton may be able to infer dimensions ?
  // https://mui.com/material-ui/react-skeleton/#inferring-dimensions
  if (isLoading)
    return (
      <Box>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </Box>
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
