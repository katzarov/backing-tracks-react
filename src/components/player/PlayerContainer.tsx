import { Avatar, Box, Stack, Typography } from "@mui/material";
import { Player } from "./Player";
import { useLazyGetTrackQuery } from "@src/store/api/tracks";
import { useLazyGetPlaylistQuery } from "@src/store/api/playlists";
import { useAppSelector } from "@src/store";
import { selectPlaylistId, selectTrackId } from "@src/store/slices/player";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import { routes } from "@src/routes/routes";
import { convertIntToString } from "@src/utils/utils";

export const PlayerContainer = () => {
  const trackId = useAppSelector(selectTrackId);
  const playlistId = useAppSelector(selectPlaylistId);

  const [fetchGetTrackQuery, { data: trackData }] = useLazyGetTrackQuery();
  const [fetchGetPlaylistQuery, { data: playlistData }] =
    useLazyGetPlaylistQuery();

  useEffect(() => {
    if (trackId === null) {
      return;
    }
    // TODO Can probably use the useQueryState hook to get the data from the getAllXXX queries, instead of fetching by id here.
    // Also pass loading state to player component.
    fetchGetTrackQuery(trackId, true);

    if (playlistId !== null) {
      fetchGetPlaylistQuery(playlistId, true);
    }
    // TODO if 404 error, show some notification/message and redirect user to home, maybe remove wrong url from nav history.
  }, [trackId, playlistId, fetchGetTrackQuery, fetchGetPlaylistQuery]);

  const trackName = trackData?.meta.trackName || "";
  const artistName = trackData?.meta.artist.artistName || "";
  const playlistName = playlistId !== null ? playlistData?.name || "" : "";

  const albumImageSrc = trackData?.meta.albumArt.small?.url || "";

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
        trackUri={trackData?.resourceId ?? null}
        duration={trackData?.duration ?? null}
      />
      <Box sx={{ width: "50%", textAlign: "right" }}></Box>
    </Box>
  );
};
