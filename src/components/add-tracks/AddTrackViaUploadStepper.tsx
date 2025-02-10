import { FC, useState } from "react";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import {
  DialogContent,
  DialogTitle,
  StepContent,
  StepLabel,
} from "@mui/material";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
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

const steps = [
  {
    label: "Upload track",
    description: "Upload track from your local file system.",
  },
  {
    label: "Find track in Spotify",
    description:
      "Please find the YouTube track in Spotify's catalogue. This is used to get all the necessary details for the track.",
  },
];

export const AddTrackViaUploadStepper: FC = () => {
  const { openModal, disableClose, setDisableClose, handleCloseModal } =
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
      <DialogTitle sx={{ m: 0, p: 2 }}>Add track via file upload</DialogTitle>
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
              <StepLabel color="inherit">{step.label}</StepLabel>
              <StepContent sx={{ borderLeft: "none" }}>
                {step.description}
              </StepContent>
            </Step>
          ))}
        </Stepper>
      </DialogContent>

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
          setDialogDisableClose={setDisableClose}
          onStepComplete={handleFindTrackInSpotifyCompleted}
          onResetAllSteps={handleResetSteps}
        />
      )}
    </Dialog>
  );
};
