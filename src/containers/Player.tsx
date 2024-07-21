import { useMemo, useCallback, useRef, useEffect } from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import IconButton from "@mui/material/IconButton";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import FastForwardRounded from "@mui/icons-material/FastForwardRounded";
import FastRewindRounded from "@mui/icons-material/FastRewindRounded";
import { useWavesurfer } from "@wavesurfer/react";
import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { useParams } from "react-router-dom";
import { formatFromSeconds } from "../utils/utils";
import { TrackLoader } from "../services/track-loader";

export const Player = () => {
  const { resourceId } = useParams();
  const containerRef = useRef(null);

  const { wavesurfer, isPlaying, currentTime } = useWavesurfer({
    container: containerRef,
    height: 150,
    backend: "WebAudio",
    waveColor: "rgb(200, 0, 200)",
    progressColor: "rgb(100, 0, 100)",
    dragToSeek: true,
    plugins: useMemo(() => [Timeline.create()], []),
  });

  useEffect(() => {
    if (wavesurfer === null || resourceId === undefined) return;

    const init = async () => {
      const blob = await TrackLoader.loadTrack(resourceId);
      // todo handle null/failure 
      wavesurfer.loadBlob(blob!);
    };
    init();
  }, [wavesurfer, resourceId]);

  // wavesurfer && wavesurfer.on("play", (e) => console.log("play start"));

  const onPlayPause = useCallback(() => {
    if (wavesurfer === null) return;

    wavesurfer.playPause();
  }, [wavesurfer]);

  return (
    <>
      {/* // TODO add loading and error skeleton */}
      <Box ref={containerRef} />
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          mt: 2,
        }}
      >
        <IconButton aria-label="previous song">
          <FastRewindRounded fontSize="large" />
        </IconButton>
        <IconButton
          aria-label={isPlaying ? "pause" : "play"}
          onClick={onPlayPause}
        >
          {isPlaying ? (
            <PauseRounded sx={{ fontSize: "3rem" }} />
          ) : (
            <PlayArrowRounded sx={{ fontSize: "3rem" }} />
          )}
        </IconButton>
        <IconButton aria-label="next song">
          <FastForwardRounded fontSize="large" />
        </IconButton>
      </Box>
      <Typography>Current time: {formatFromSeconds(currentTime)}</Typography>
    </>
  );
};
