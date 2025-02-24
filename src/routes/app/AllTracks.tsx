import { useGetAllTracksQuery } from "../../store/api/tracks";

import { TrackList } from "../../components/track-list/TrackList";
import { routes } from "../routes";

export const AllTracks = () => {
  const { data, isLoading, isError } = useGetAllTracksQuery();

  if (isError) return "show error";

  return (
    <TrackList
      sx={{ mt: { sm: "var(--fixed-ui-spacing)" } }}
      data={data}
      isLoading={isLoading}
      trackItemClickRouteNavigateTo={routes.app.allTracks.id}
    />
  );
};
