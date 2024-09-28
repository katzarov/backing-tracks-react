import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Modal, StepLabel } from "@mui/material";
import { useStepper } from "../../hooks/useStepper";
import { LinkToYouTubeTrack } from "./steps/LinkToYouTubeTrack";
import {
  IFindTrackInSpotifyResult,
  ILinkToYouTubeTrackResult,
  TrackType,
} from "./interface";
import { FindTrackInSpotify } from "./steps/FindTrackInSpotify";

const steps = ["Enter YouTube link", "Edit track details"];

const modalBodyStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 800,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IAddYouTubeTrackStepperProps {
  showModal: boolean;
  onClose: () => void;
}

export const AddYouTubeTrackStepper: FC<IAddYouTubeTrackStepperProps> = ({
  showModal,
  onClose,
}) => {
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
    onClose();
  };

  return (
    <Modal
      open={showModal}
      keepMounted={false}
      onClose={handleOnClose} // TODO: need to refactor the logic. In order to be able to disable this while something in the steps loading, for example.
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
      </Box>
    </Modal>
  );
};
