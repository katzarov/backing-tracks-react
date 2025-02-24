import { useGetTracksOfPlaylistQuery } from "../../store/api/playlists";

import { TrackList } from "../../components/track-list/TrackList";
import { useParams } from "react-router-dom";
import { routes } from "../routes";
import { PlaylistDetailsLoadingContainer } from "@src/components/playlist-list/PlaylistDetails.loading-container";

export const TracksOfPlaylist = () => {
  const { playlistId } = useParams();
  const { data, isLoading, isError } = useGetTracksOfPlaylistQuery(
    parseInt(playlistId!, 10)
  );

  if (isError) return "show error";

  return (
    <>
      <PlaylistDetailsLoadingContainer data={data} isLoading={isLoading} />
      <TrackList
        data={data?.tracks}
        isLoading={isLoading}
        trackItemClickRouteNavigateTo={routes.app.playlist.track.id}
      />
    </>
  );
};
