import { FC, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import {
  DialogContent,
  DialogTitle,
  StepContent,
  StepLabel,
  Typography,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useStepper } from "../../hooks/useStepper";
import { LinkToYouTubeTrack } from "./steps/LinkToYouTubeTrack";
import {
  IFindTrackInSpotifyResult,
  ILinkToYouTubeTrackResult,
  TrackType,
} from "./interface";
import { FindTrackInSpotify } from "./steps/FindTrackInSpotify";
import { Dialog } from "../shared/Dialog";
import { AddYouTubeTrackStepperModalContext } from "./AddTrackMenu.context";

const steps = [
  {
    label: "Enter YouTube link",
    description: "This link is used to download the YouTube video.",
  },
  {
    label: "Find track in Spotify",
    description:
      "Please find the YouTube track in Spotify's catalogue. This is used to get all the necessary details for the track.",
  },
];

export const AddYouTubeTrackStepper: FC = () => {
  const { openModal, disableClose, setDisableClose, handleCloseModal } =
    AddYouTubeTrackStepperModalContext.getUseModalContextHook()();

  const { activeStep, completed, handleStep, handleReset } = useStepper(steps);
  const [linkToYouTubeTrackResult, setLinkToYouTubeTrackResult] =
    useState<ILinkToYouTubeTrackResult>();

  const handleLinkToYouTubeTrackCompleted = (
    result: ILinkToYouTubeTrackResult
  ) => {
    setLinkToYouTubeTrackResult(result);

    const { trackType } = result;
    if (trackType === TrackType.BACKING) {
      handleStep(1);
    } else {
      // do some state update for step 2 ?
      handleStep(2);
    }
  };

  const handleFindTrackInSpotifyCompleted = (
    result: IFindTrackInSpotifyResult
  ) => {
    if (result === undefined) {
      handleOnClose();
    } else {
      // go to manual enter step
    }
  };

  const handleResetSteps = () => {
    setLinkToYouTubeTrackResult(undefined);
    handleReset();
  };

  const handleOnClose = () => {
    handleResetSteps();
    handleCloseModal();
  };

  return (
    <Dialog
      fullWidth
      maxWidth="md"
      open={openModal}
      disableClose={disableClose}
      onClose={handleCloseModal}
    >
      <DialogTitle sx={{ m: 0, p: 2 }}>Add track from YouTube</DialogTitle>
      <IconButton
        aria-label="close-dialog"
        disabled={disableClose}
        onClick={handleCloseModal}
        sx={(theme) => ({
          position: "absolute",
          right: 8,
          top: 8,
          color: theme.palette.primary.main,
        })}
      >
        <CloseIcon />
      </IconButton>

      <DialogContent sx={{ pb: 0 }}>
        <Stepper
          activeStep={activeStep}
          connector={null}
          sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
        >
          {steps.map((step, index) => (
            <Step key={step.label} completed={completed[index]}>
              <StepLabel>{step.label}</StepLabel>
              {/* TODO FIX ERR MUI: <StepContent /> is only designed for use with the vertical stepper. */}
              <StepContent sx={{ borderLeft: "none" }}>
                <Typography variant="secondary">{step.description}</Typography>
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </DialogContent>

      {activeStep === 0 && (
        <LinkToYouTubeTrack
          onStepComplete={handleLinkToYouTubeTrackCompleted}
        />
      )}
      {activeStep === 1 && (
        <FindTrackInSpotify
          trackUri={linkToYouTubeTrackResult!.youtubeUrl}
          trackType={linkToYouTubeTrackResult!.trackType}
          trackInstrument={linkToYouTubeTrackResult!.trackInstrument}
          preliminarySpotifySearchSuggestions={
            linkToYouTubeTrackResult!.preliminarySpotifySearchSuggestions
          }
          preliminaryTrackName={linkToYouTubeTrackResult!.trackName}
          setDialogDisableClose={setDisableClose}
          onStepComplete={handleFindTrackInSpotifyCompleted}
          onResetAllSteps={handleResetSteps}
        />
      )}
    </Dialog>
  );
};
