import { routes } from "@src/routes/routes";
import { IPlaylistResponseDto } from "@src/store/api/playlists";
import { ITrackResponseDto } from "@src/store/api/tracks";
import { parseStringAsInt } from "@src/utils/utils";
import { PathMatch, useMatch } from "react-router-dom";

interface useAppPathParamsReturnType {
  isPathAllTracksTrackId: boolean;
  isPathPlaylistIdTrackId: boolean;
  trackId: ITrackResponseDto["id"] | null;
  playlistId: IPlaylistResponseDto["id"] | null;
}

const noMatch = {
  isPathAllTracksTrackId: false,
  isPathPlaylistIdTrackId: false,
  trackId: null,
  playlistId: null,
};

const getAllTracksTrackIdPathParams = (pathMatch: PathMatch<string> | null) => {
  if (pathMatch === null) {
    return noMatch;
  }

  const { trackId } = pathMatch.params;
  const parsedTrackId = parseStringAsInt(trackId);

  return {
    ...noMatch,
    isPathAllTracksTrackId: true,
    trackId: parsedTrackId,
  };
};

const getPlaylistIdTrackIdPathParams = (
  pathMatch: PathMatch<string> | null
) => {
  if (pathMatch === null) {
    return noMatch;
  }

  const { trackId, playlistId } = pathMatch.params;
  const parsedTrackId = parseStringAsInt(trackId);
  const parsedPlaylistId = parseStringAsInt(playlistId);

  return {
    ...noMatch,
    isPathPlaylistIdTrackId: true,
    trackId: parsedTrackId,
    playlistId: parsedPlaylistId,
  };
};

// TODO: abstract the rest of the react router api usage in this hook or another ?, like useNavigate
export const useAppPathParams = (): useAppPathParamsReturnType => {
  const allTracksTrackIdPathMatch = useMatch(
    `${routes.app.allTracks.root}/${routes.app.allTracks.id()}`
  );
  const playlistIdTrackIdPathMatch = useMatch(
    `${routes.app.playlist.id()}/${routes.app.playlist.track.id()}`
  );

  const allTracksTrackIdParams = getAllTracksTrackIdPathParams(
    allTracksTrackIdPathMatch
  );

  if (allTracksTrackIdParams.isPathAllTracksTrackId) {
    return allTracksTrackIdParams;
  }

  const playlistIdTrackIdParams = getPlaylistIdTrackIdPathParams(
    playlistIdTrackIdPathMatch
  );

  if (playlistIdTrackIdParams.isPathPlaylistIdTrackId) {
    return playlistIdTrackIdParams;
  }

  return noMatch;
};
