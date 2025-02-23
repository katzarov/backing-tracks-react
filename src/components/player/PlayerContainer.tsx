import { Grid2 as Grid } from "@mui/material";
import { Player } from "./Player";
import { routes } from "src/routes/routes";
import { convertIntToString } from "src/utils/utils";
import { useSelectedTrackPlaylistData } from "src/hooks/useSelectedTrackPlaylistData";
import { TrackInfo } from "../shared/TrackInfo";

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
  } = useSelectedTrackPlaylistData();

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
      alignItems="center"
    >
      <Grid
        size={{ xs: 12, sm: 3 }}
        maxWidth="100%"
        display="flex"
        alignItems="center"
        flexDirection="row"
      >
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
        />
      </Grid>

      <Grid
        size={{ xs: 12, sm: 6 }}
        display="flex"
        alignItems="center"
        flexDirection="row"
      >
        <Player
          trackId={trackId}
          playlistId={playlistId}
          trackUri={trackUri}
          duration={trackDuration}
        />
      </Grid>
      <Grid
        size={{ xs: 12, sm: 3 }}
        display="flex"
        alignItems="center"
        flexDirection="row"
      ></Grid>
    </Grid>
  );
};
