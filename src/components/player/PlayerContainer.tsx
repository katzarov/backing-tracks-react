import { Grid2 as Grid } from "@mui/material";
import { IWavesurferRef, Player } from "./Player";
import { routes } from "src/routes/routes";
import { convertIntToString } from "src/utils/utils";
import { useSelectedTrackPlaylistData } from "src/hooks/useSelectedTrackPlaylistData";
import { TrackInfo } from "../shared/TrackInfo";
import { useCallback, useRef } from "react";
import { PlaylistControls } from "./PlaylistControls";
import { TrackRegions } from "./TrackRegions";
import { TrackControls } from "./TrackControls";

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
  const wavesurferRef = useRef<IWavesurferRef | null>(null);

  const handlePlayPause = useCallback(() => {
    wavesurferRef.current?.playPause();
  }, []);

  const handleSetVolume = useCallback((volumeLevel: number) => {
    wavesurferRef.current?.setVolume(volumeLevel);
  }, []);

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
          onPlayPause={handlePlayPause}
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
          ref={wavesurferRef}
          trackId={trackId}
          playlistId={playlistId}
          trackUri={trackUri}
          duration={trackDuration}
          regions={regions}
        />
      </Grid>
      <Grid size={{ xs: 12, sm: 2 }}>
        <TrackRegions />
      </Grid>
      <Grid size={{ xs: 12, sm: 2 }}>
        <TrackControls handleSetVolume={handleSetVolume} />
      </Grid>
    </Grid>
  );
};
