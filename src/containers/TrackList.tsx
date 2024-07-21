import { Link } from "react-router-dom";
import Box from "@mui/material/Box";
import Skeleton from "@mui/material/Skeleton";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";

import { useGetAllTracksQuery } from "../store/api/tracks";
import { formatFromSeconds } from "../utils/utils";

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
    ({ resourceId, trackType, trackInstrument, duration, meta }, index) => {
      const { trackName, artist } = meta;
      const { artistName } = artist;
      return (
        <ListItem
          key={resourceId}
          disablePadding
          alignItems="center"
          sx={{ width: "100%" }}
        >
          <ListItemButton component={Link} to={`track/${resourceId}`}>
            <ListItemText primary={index + 1} sx={{ width: 50 }} />
            <ListItemText
              primary={trackName}
              secondary={artistName}
              sx={{ width: "100%" }}
            />
            <ListItemText secondary={trackType} sx={{ width: 100 }} />
            <ListItemText
              secondary={formatFromSeconds(duration)}
              sx={{ width: 50 }}
            />
          </ListItemButton>
        </ListItem>
      );
    }
  );

  return (
    <List dense sx={{ width: "100%", bgcolor: "background.paper" }}>
      {trackList}
    </List>
  );
};
