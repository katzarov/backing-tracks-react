import { Grid2 as Grid } from "@mui/material";
import { IPlayerInstanceMethods, Player } from "./Player";
import { routes } from "src/routes/routes";
import { convertIntToString } from "src/utils/utils";
import { useSelectedTrackPlaylistData } from "src/hooks/useSelectedTrackPlaylistData";
import { TrackInfo } from "../shared/TrackInfo";
import { useRef } from "react";
import { PlaylistControls } from "./PlaylistControls";
import { TrackControls } from "./TrackControls";
import { TrackRegionsContainer } from "./track-regions/TrackRegionsContainer";

export const PlayerContainer = () => {
  const {
    trackId,
    trackName,
    trackUri,
    trackDuration,
    artistName,
    playlistId,
    playlistName,
    albumImageSrc,
    regions,
  } = useSelectedTrackPlaylistData();

  // if we need to hit play from another spot... we will rethink how we do it.. maybe event bus will be needed.
  const playerInstanceMethodsRef = useRef<IPlayerInstanceMethods | null>(null);

  const playlistIdTrackIdRoute =
    playlistId !== null && trackId !== null
      ? `${routes.app.playlist.id(
          convertIntToString(playlistId)
        )}/${routes.app.playlist.track.id(convertIntToString(trackId))}`
      : null;

  return (
    <Grid
      container
      width="100%"
      columns={12}
      rowSpacing={2}
      columnSpacing={{ xs: 2, sm: 4 }}
    >
      <Grid size={{ xs: 12, sm: 3 }}>
        <TrackInfo
          imageSrc={albumImageSrc}
          trackName={trackName}
          artistName={artistName}
          {...(playlistIdTrackIdRoute !== null
            ? {
                linkToPlaylist: {
                  link: playlistIdTrackIdRoute,
                  name: playlistName,
                },
              }
            : {})}
          sx={{ mt: 3 }}
        />
        <PlaylistControls
          playerInstanceMethodsRef={playerInstanceMethodsRef}
          playlistId={playlistId}
          sx={{ mt: 2 }}
        />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 5 }}
        display="flex"
        alignItems="center"
        flexDirection="row"
      >
        <Player
          ref={playerInstanceMethodsRef}
          trackId={trackId}
          playlistId={playlistId}
          trackUri={trackUri}
          duration={trackDuration}
          regions={regions}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 2 }}>
        <TrackRegionsContainer
          playerInstanceMethodsRef={playerInstanceMethodsRef}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 2 }}>
        <TrackControls playerInstanceMethodsRef={playerInstanceMethodsRef} />
      </Grid>
    </Grid>
  );
};
