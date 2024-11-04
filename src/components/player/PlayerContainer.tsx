import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Player } from "./Player";
import { Link } from "react-router-dom";
import { routes } from "src/routes/routes";
import { convertIntToString } from "src/utils/utils";
import { useSelectedTrackPlaylistData } from "src/hooks/useSelectedTrackPlaylistData";

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
      : "";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        // padding: 2,
        px: 2,
        py: 1,
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Stack
        direction="row"
        spacing={2}
        sx={{ alignItems: "center", width: "50%" }}
      >
        {/* TODO load small image for mobile and larger for desktop https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes */}
        <Avatar
          variant="square"
          src={albumImageSrc}
          sx={{ width: 64, height: 64 }}
        />
        <Stack
          direction="column"
          spacing={0.5}
          sx={{ alignItems: "flex-start" }}
        >
          {/* TODO do noWrap but need to specify actual width, do so based on screen size */}
          <Typography variant={"subtitle2"}>{trackName}</Typography>
          <Typography variant={"body2"}>{artistName}</Typography>
          <Typography variant={"body2"}>
            <Link
              to={playlistIdTrackIdRoute}
              style={{
                color: "unset",
              }}
            >
              {playlistName}
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Player
        trackUri={trackUri}
        duration={trackDuration}
      />
      <Box sx={{ width: "50%", textAlign: "right" }}></Box>
    </Box>
  );
};
