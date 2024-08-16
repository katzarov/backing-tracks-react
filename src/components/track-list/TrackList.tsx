import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";
import List from "@mui/material/List";
import { useGetAllTracksQuery } from "../../store/api/tracks";
import { TrackListItem } from "./TrackListItem";

export const TrackList = () => {
  const { data, isLoading, isError } = useGetAllTracksQuery();

  // TODO skeleton may be able to infer dimensions ?
  // https://mui.com/material-ui/react-skeleton/#inferring-dimensions
  if (isLoading || isError)
    return (
      <Box>
        <Skeleton height={50} />
        <Skeleton height={50} />
        <Skeleton height={50} />
      </Box>
    );

  const trackList = data!.map(
    ({ resourceId, trackType, duration, meta }, index) => {
      const { trackName, artist } = meta;
      const { artistName } = artist;

      return (
        <TrackListItem
          key={resourceId}
          index={index}
          resourceId={resourceId}
          trackName={trackName}
          trackType={trackType}
          duration={duration}
          artistName={artistName}
        />
      );
    }
  );

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {trackList}
    </List>
  );
};
