import { FC, useState } from "react";
import Box from "@mui/material/Box";
import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import { Modal, StepLabel } from "@mui/material";
import { AddYouTubeTrackStep1 } from "./AddYouTubeTrackStep1";
import { useStepper } from "./useStepper";
import {
  ISearchForTrackInSpotifyResponse,
  IYouTubeVideoInfoResponse,
} from "../../store/api/acquireTracks";
import { AddYouTubeTrackStep2 } from "./AddYouTubeTrackStep2";

const steps = ["Enter YouTube link", "Edit track details"];

const modalBodyStyles = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 600,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

interface IAddYouTubeTrackProps {
  showModal: boolean;
  onClose: () => void;
}

export type ITrackType = "backing" | "jam";

export interface IAddYouTubeTrackStep1Result extends IYouTubeVideoInfoResponse {
  videoUrl: string;
  trackType: ITrackType;
  searchResults: ISearchForTrackInSpotifyResponse[];
}

export const AddYouTubeTrack: FC<IAddYouTubeTrackProps> = ({
  showModal,
  onClose,
}) => {
  const { activeStep, completed, handleNext, handleReset } = useStepper(steps);
  const [step1Result, setStep1Result] = useState<IAddYouTubeTrackStep1Result>();

  const handleResetSteps = () => {
    setStep1Result(undefined);
    handleReset();
  };

  return (
    <Modal
      open={showModal}
      onClose={onClose} // TODO: need to refactor the logic. In order to be able to disable this while something in the steps loading, for example.
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
            <AddYouTubeTrackStep1
              goNextStep={handleNext}
              setResult={setStep1Result}
            />
          )}
          {activeStep === 1 && (
            <AddYouTubeTrackStep2
              videoInfo={step1Result!}
              completeSteps={onClose}
              resetSteps={handleResetSteps}
            />
          )}
        </Box>
      </Box>
    </Modal>
  );
};
