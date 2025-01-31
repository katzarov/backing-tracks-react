import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { DialogContent, StepLabel } from "@mui/material";
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

const steps = ["Enter YouTube link", "Edit track details"];

export const AddYouTubeTrackStepper: FC = () => {
  const { openModal, disableClose, handleCloseModal } =
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
      <DialogContent>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel color="inherit">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
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
              onStepComplete={handleFindTrackInSpotifyCompleted}
              onResetAllSteps={handleResetSteps}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
