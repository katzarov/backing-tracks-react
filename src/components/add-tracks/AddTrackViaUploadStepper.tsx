import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Modal, StepLabel } from "@mui/material";
import { useStepper } from "../../hooks/useStepper";
import {
  IFindTrackInSpotifyResult,
  IUploadTrackResult,
  TrackType,
} from "./interface";
import { FindTrackInSpotify } from "./steps/FindTrackInSpotify";
import { UplaodTrack } from "./steps/UploadTrack";

const steps = ["Upload track", "Edit track details"];

const modalBodyStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  // width: '100%', maxWidth: 800
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IAddTrackViaUploadStepperProps {
  showModal: boolean;
  onClose: () => void;
}

export const AddTrackViaUploadStepper: FC<
  IAddTrackViaUploadStepperProps
> = ({ showModal, onClose }) => {
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
    onClose();
  };

  return (
    <Modal
      open={showModal}
      onClose={handleOnClose} // TODO: need to refactor the logic. In order to be able to disable this while something in the steps loading, for example.
      // disableRestoreFocus={true}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={modalBodyStyles}>
        <Stepper activeStep={activeStep}>
          {steps.map((label, index) => (
            <Step key={label} completed={completed[index]}>
              <StepLabel color="inherit">{label}</StepLabel>
            </Step>
          ))}
        </Stepper>
        <Box>
          {activeStep === 0 && (
            <UplaodTrack onStepComplete={handleUploadTrackCompleted} />
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
      </Box>
    </Modal>
  );
};
