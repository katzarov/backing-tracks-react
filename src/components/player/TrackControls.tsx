import RepeatIcon from "@mui/icons-material/Repeat";
import { Slider, Stack, ToggleButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/store";
import { selectIsLooping, setIsLooping } from "@src/store/slices/player";
import { FC, RefObject, useState } from "react";
import VolumeUp from "@mui/icons-material/VolumeUp";
import { IPlayerInstanceMethods } from "./Player";

/**
 *
 * Domain: 0-100. Range: 0-1. Scale: exp.
 *
 * @param steepness < 9 gives more control in the higher volume range, might want to do that. > 9 gives more control in the low volume range.
 */
const sliderToVolumeGainExponential = (value: number, steepness = 9) => {
  const x = Math.min(Math.max(value, 0), 100) / 100;
  return (Math.pow(steepness + 1, x) - 1) / steepness;
};

interface ITrackControlsProps {
  playerInstanceMethodsRef: RefObject<IPlayerInstanceMethods | null>;
}

export const TrackControls: FC<ITrackControlsProps> = ({
  playerInstanceMethodsRef,
}) => {
  const isLooping = useAppSelector(selectIsLooping);
  const dispatch = useAppDispatch();

  // will probably have a per track volume that is saved in db. And will have a master volume, so we will need to set the curr volume based on them.
  // TODO: we actualy want to read back the volume from the ws instance. Otherwise it could potentially get out of sync.
  const [volumeSliderValue, setVolumeSliderValue] = useState<number>(100);

  const handleVolumeSliderChange = (
    event: Event,
    newValue: number | number[]
  ) => {
    if (typeof newValue !== "number") {
      console.warn("slider value is not a number");
      // todo show err
      return;
    }

    setVolumeSliderValue(newValue);
    const gain = sliderToVolumeGainExponential(newValue);
    playerInstanceMethodsRef.current?.wavesurferMethods.setVolume(gain);
  };

  const handleIsLoopingChange = () => {
    dispatch(setIsLooping(!isLooping));
  };

  return (
    <Stack direction="row" height="100%" justifyContent="space-evenly">
      <Stack>
        <ToggleButton
          value="check"
          selected={isLooping}
          size="small"
          sx={{ width: "fit-content" }}
          onChange={handleIsLoopingChange}
        >
          <RepeatIcon />
        </ToggleButton>
      </Stack>
      <Stack alignItems="center" gap={2}>
        <Slider
          aria-label="Volume"
          orientation="vertical"
          value={volumeSliderValue}
          onChange={handleVolumeSliderChange}
          sx={{ mt: 4 }}
        />
        <VolumeUp />
      </Stack>
    </Stack>
  );
};
