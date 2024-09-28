import { FC } from "react";
import { Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { TrackType, TrackInstrument } from "../interface";

interface ITrackDetailsProps {
  trackTypeKey: string;
  trackTypeValue: TrackType;
  trackInstrumentKey: string;
  trackInstrumentValue: TrackInstrument;
  disabled: boolean;
  onTrackTypeBackingClick: () => void;
  onTrackTypeJamClick: () => void;
  onTrackInstrumentGuitarClick: () => void;
  onTrackInstrumentBassClick: () => void;
}

export const TrackDetails: FC<ITrackDetailsProps> = ({
  trackTypeKey,
  trackTypeValue,
  trackInstrumentKey,
  trackInstrumentValue,
  disabled,
  onTrackTypeBackingClick,
  onTrackTypeJamClick,
  onTrackInstrumentGuitarClick,
  onTrackInstrumentBassClick,
}) => {
  return (
    <>
      <Typography variant="subtitle1">
        Is this a backing track or a jam track ?
      </Typography>
      <ToggleButtonGroup
        id={trackTypeKey}
        color="primary"
        value={trackTypeValue}
        disabled={disabled}
        exclusive
        aria-label="Track type"
      >
        <ToggleButton
          onClick={onTrackTypeBackingClick}
          id="backing"
          value={TrackType.BACKING}
        >
          Backing Track
        </ToggleButton>
        <ToggleButton
          onClick={onTrackTypeJamClick}
          id="jam"
          value={TrackType.JAM}
          disabled={true} // TODO: jam track flow not implemented yet
        >
          Jam Track
        </ToggleButton>
      </ToggleButtonGroup>
      <Typography variant="subtitle1">
        Is this track for guitar or bass ?
      </Typography>
      <ToggleButtonGroup
        id={trackInstrumentKey}
        color="primary"
        value={trackInstrumentValue}
        disabled={disabled}
        exclusive
        aria-label="Track type"
      >
        <ToggleButton
          onClick={onTrackInstrumentGuitarClick}
          id="guitar"
          value={TrackInstrument.GUITAR}
        >
          Guitar
        </ToggleButton>
        <ToggleButton
          onClick={onTrackInstrumentBassClick}
          id="bass"
          value={TrackInstrument.BASS}
        >
          Bass
        </ToggleButton>
      </ToggleButtonGroup>
    </>
  );
};
