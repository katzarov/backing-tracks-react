import { useMemo, useCallback, useRef, useEffect, useState, FC } from "react";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { TrackLoader } from "@lib/track-loader";
import { ITrackResponseDto } from "@src/store/api/tracks";
import { PeaksLoader } from "@src/lib/peaks-loader";
import { formatFromSeconds } from "@src/utils/utils";
import { lighten, Typography, useTheme } from "@mui/material";
import {
  StyledLoadingOverlay,
  StyledLoadingOverlayMessage,
} from "./Player.styled";
import { IPlaylistResponseDto } from "src/store/api/playlists";
import { useAppDispatch } from "src/store";
import {
  userEventClickNextTrack,
  userEventClickPreviousTrack,
} from "src/store/extraActions";
import { isSafari } from "src/utils/detect-browser";

interface IPlayerProps {
  trackId: ITrackResponseDto["id"] | null;
  playlistId: IPlaylistResponseDto["id"] | null;
  trackUri: ITrackResponseDto["resourceId"] | null;
  // TODO should probably get the duration from wavesurfer.js, lets do it when we redo the binding with the lib although the current one is good as well as we got it via ffprobe
  duration: ITrackResponseDto["duration"] | null;
}

const timelineHeight = 16;
const timelineHeightString = `${timelineHeight}px`;

// TODO drop this wavesurfer react lib and create my own binding.
export const Player: FC<IPlayerProps> = ({
  // trackId,
  playlistId,
  trackUri,
  duration,
}) => {
  const dispatch = useAppDispatch();
  const theme = useTheme();
  const containerRef = useRef(null);
  const [isPlayerLoading, setIsPlayerLoading] = useState(false);
  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 50,
    backend: isSafari ? "WebAudio" : "MediaElement",
    waveColor: lighten(theme.palette.primary.main, 0.25),
    progressColor: theme.palette.primary.main,
    dragToSeek: true,
    plugins: useMemo(
      () => [
        Timeline.create({
          height: timelineHeight,
          //TODO will need to make this more sparse for smaller screens and just disable for mobile.
          timeInterval: 15,
          secondaryLabelOpacity: 1,
          style: { fontSize: "14px" },
        }),
      ],
      []
    ),
  });

  useEffect(() => {
    if (wavesurfer === null) {
      return;
    }

    if (trackUri === null) {
      wavesurfer.seekTo(0);
      wavesurfer.empty();
      return;
    }

    let didCancel = false;
    // TODO https://developer.mozilla.org/en-US/docs/Web/API/AbortController#constructor
    // for sure need to be able to abort the reqs for fetching tracks as they are quite big, 5-10mb per each track

    const loadTrackInPlayer = async () => {
      setIsPlayerLoading(true);
      wavesurfer.seekTo(0);
      // wavesurfer.empty();

      const blob = await TrackLoader.loadTrack(trackUri);
      if (blob === null) {
        console.warn("track is null");
        setIsPlayerLoading(false);
        return;
      }

      const peaks = await PeaksLoader.loadPeaks(trackUri);

      if (peaks === null) {
        if (didCancel) {
          return;
        }
        // TODO show computing peaks loader
        await wavesurfer.loadBlob(blob!);
        const exportedPeaks = wavesurfer.exportPeaks();

        // TODO: try delete key first? maybe its null cause failed to save last time exports and needs cleanup now...
        await PeaksLoader.savePeaks(trackUri, exportedPeaks);
      } else {
        if (didCancel) {
          return;
        }
        await wavesurfer.loadBlob(blob!, peaks);
      }
      // handle error
      setIsPlayerLoading(false);
    };
    loadTrackInPlayer();

    return () => {
      didCancel = true;
    };
  }, [wavesurfer, trackUri]);

  const onPlayPause = useCallback(() => {
    if (wavesurfer === null) return;

    wavesurfer.playPause();
  }, [wavesurfer]);

  const onPrevTrackHandler = () => {
    dispatch(userEventClickPreviousTrack());
  };

  const onNextTrackHandler = () => {
    dispatch(userEventClickNextTrack());
  };


  const formattedCurrentTime = formatFromSeconds(currentTime);
  const formattedDuration = formatFromSeconds(duration ?? 0);

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "100%" }}>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <IconButton
          aria-label="previous song"
          disabled={playlistId === null}
          onClick={onPrevTrackHandler}
        >
          <FastRewindRounded sx={{ fontSize: "1.8rem" }} />
        </IconButton>
        <IconButton
          aria-label={isPlaying ? "pause" : "play"}
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <PauseRounded sx={{ fontSize: "2rem" }} />
          ) : (
            <PlayArrowRounded sx={{ fontSize: "2rem" }} />
          )}
        </IconButton>
        <IconButton
          aria-label="next song"
          disabled={playlistId === null}
          onClick={onNextTrackHandler}
        >
          <FastForwardRounded sx={{ fontSize: "1.8rem" }} />
        </IconButton>
      </Box>

      <Box sx={{ display: "flex", alignItems: "center", gap: 1 }}>
        <Typography sx={{ mb: timelineHeightString }}>
          {formattedCurrentTime}
        </Typography>

        <Box sx={{ position: "relative", flexGrow: 1 }}>
          <Box ref={containerRef} sx={{ flexGrow: 1 }} />

          {/* TODO only show if track is not found in IndexeDB, and needs to fetched from server. Also show if, track is found in IndexedDB but the peaks are not and need to be computed */}
          {isPlayerLoading && (
            <>
              <StyledLoadingOverlay />
              <StyledLoadingOverlayMessage>
                Loading audio
              </StyledLoadingOverlayMessage>
            </>
          )}
        </Box>
        <Typography sx={{ mb: timelineHeightString }}>
          {formattedDuration}
        </Typography>
      </Box>
    </Box>
  );
};
