import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { DialogContent, StepLabel } from "@mui/material";
import { useStepper } from "../../hooks/useStepper";
import {
  IFindTrackInSpotifyResult,
  IUploadTrackResult,
  TrackType,
} from "./interface";
import { FindTrackInSpotify } from "./steps/FindTrackInSpotify";
import { UploadTrack } from "./steps/UploadTrack";
import { Dialog } from "../shared/Dialog";
import { AddTrackViaUploadStepperModalContext } from "./AddTrackMenu.context";

const steps = ["Upload track", "Edit track details"];

export const AddTrackViaUploadStepper: FC = () => {
  const { openModal, disableClose, handleCloseModal } =
    AddTrackViaUploadStepperModalContext.getUseModalContextHook()();

  const { activeStep, completed, handleStep, handleReset } = useStepper(steps);
  const [uploadTrackResult, setUploadTrackResult] =
    useState<IUploadTrackResult>();

  const handleUploadTrackCompleted = (result: IUploadTrackResult) => {
    setUploadTrackResult(result);

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
    setUploadTrackResult(undefined);
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
            <UploadTrack onStepComplete={handleUploadTrackCompleted} />
          )}
          {activeStep === 1 && (
            <FindTrackInSpotify
              trackUri={uploadTrackResult!.file}
              trackType={uploadTrackResult!.trackType}
              trackInstrument={uploadTrackResult!.trackInstrument}
              preliminarySpotifySearchSuggestions={
                uploadTrackResult!.preliminarySpotifySearchSuggestions
              }
              preliminaryTrackName={uploadTrackResult!.trackName}
              onStepComplete={handleFindTrackInSpotifyCompleted}
              onResetAllSteps={handleResetSteps}
            />
          )}
        </Box>
      </DialogContent>
    </Dialog>
  );
};
