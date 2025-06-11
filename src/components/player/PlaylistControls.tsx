import { FC, RefObject } from "react";
import { IconButton, Stack, SxProps, Theme } from "@mui/material";
import PauseRounded from "@mui/icons-material/PauseRounded";
import PlayArrowRounded from "@mui/icons-material/PlayArrowRounded";
import SkipPreviousIcon from "@mui/icons-material/SkipPrevious";
import SkipNextIcon from "@mui/icons-material/SkipNext";
import { useAppDispatch, useAppSelector } from "src/store";
import {
  userEventClickNextTrack,
  userEventClickPreviousTrack,
} from "src/store/extraActions";
import { selectIsPlaying } from "@src/store/slices/player";
import { IPlayerInstanceMethods } from "./Player";

interface IPlaylistControlsProps {
  playlistId: number | null;
  playerInstanceMethodsRef: RefObject<IPlayerInstanceMethods | null>;
  sx?: SxProps<Theme>;
}

export const PlaylistControls: FC<IPlaylistControlsProps> = ({
  playlistId,
  playerInstanceMethodsRef,
  sx,
}) => {
  const isPlaying = useAppSelector(selectIsPlaying);
  const dispatch = useAppDispatch();

  const onPrevTrackHandler = () => {
    dispatch(userEventClickPreviousTrack());
  };

  const onNextTrackHandler = () => {
    dispatch(userEventClickNextTrack());
  };

  const onPlayPauseHandler = () => {
    playerInstanceMethodsRef.current?.wavesurferMethods.playPause();
  };

  return (
    <Stack
      direction="row"
      alignItems="center"
      justifyContent="flex-start"
      sx={sx}
    >
      <IconButton
        color="primary"
        aria-label="previous song"
        disabled={playlistId === null}
        onClick={onPrevTrackHandler}
      >
        <SkipPreviousIcon sx={{ fontSize: "1.5rem" }} />
      </IconButton>
      <IconButton
        color="primary"
        aria-label={isPlaying ? "pause" : "play"}
        onClick={onPlayPauseHandler}
      >
        {isPlaying ? (
          <PauseRounded sx={{ fontSize: "2rem" }} />
        ) : (
          <PlayArrowRounded sx={{ fontSize: "2rem" }} />
        )}
      </IconButton>
      <IconButton
        color="primary"
        aria-label="next song"
        disabled={playlistId === null}
        onClick={onNextTrackHandler}
      >
        <SkipNextIcon sx={{ fontSize: "1.5rem" }} />
      </IconButton>
    </Stack>
  );
};
