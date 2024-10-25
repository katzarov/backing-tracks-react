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

  const currentTrack: {
    trackName: string;
    artistName: string;
    playlistName: string;
    albumImageSrc: string;
    trackUri: string | null;
    trackDuration: number | null;
  } = {
    trackName: "",
    artistName: "",
    playlistName: "",
    albumImageSrc: "",
    trackUri: null,
    trackDuration: null,
  };

  if (trackId !== null) {
    currentTrack.trackName = trackData?.meta.trackName || "";
    currentTrack.artistName = trackData?.meta.artist.artistName || "";
    currentTrack.playlistName =
      playlistId !== null ? playlistData?.name || "" : "";
    currentTrack.albumImageSrc = trackData?.meta.albumArt.small?.url || "";
    currentTrack.trackUri = trackData?.resourceId ?? null;
    currentTrack.trackDuration = trackData?.duration ?? null;
  }

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
          src={currentTrack.albumImageSrc}
          sx={{ width: 64, height: 64 }}
        />
        <Stack
          direction="column"
          spacing={0.5}
          sx={{ alignItems: "flex-start" }}
        >
          {/* TODO do noWrap but need to specify actual width, do so based on screen size */}
          <Typography variant={"subtitle2"}>
            {currentTrack.trackName}
          </Typography>
          <Typography variant={"body2"}>{currentTrack.artistName}</Typography>
          <Typography variant={"body2"}>
            <Link
              to={playlistIdTrackIdRoute}
              style={{
                color: "unset",
              }}
            >
              {currentTrack.playlistName}
            </Link>
          </Typography>
        </Stack>
      </Stack>
      <Player
        trackUri={currentTrack.trackUri}
        duration={currentTrack.trackDuration}
      />
      <Box sx={{ width: "50%", textAlign: "right" }}></Box>
    </Box>
  );
};
