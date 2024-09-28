import { createPortal } from "react-dom";
import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledMenu } from "./AddTrackMenu.styled";
import { AddYouTubeTrackStepper } from "./AddYouTubeTrackStepper";
import { AddTrackViaUploadStepper } from "./AddTrackViaUploadStepper";
import { useModal } from "../../hooks/useModal";
import { usePopover } from "../../hooks/usePopover";

export const AddTrackMenu = () => {
  const {
    popoverAnchorElement,
    shoulOpenPopover,
    handleOpenPopover,
    handleClosePopover,
  } = usePopover();

  const {
    openModal: openAddYouTubeTrackStepperModal,
    handleOpenModal: handleOpenAddYouTubeTrackStepperModal,
    handleCloseModal: handleCloseAddYouTubeTrackStepperModal,
  } = useModal({ cbBeforeOpen: handleClosePopover });

  const {
    openModal: openUploadTrackStepperModal,
    handleOpenModal: handleOpenUploadTrackStepperModal,
    handleCloseModal: handleCloseUploadTrackStepperModal,
  } = useModal({ cbBeforeOpen: handleClosePopover });

  return (
    <>
      <Button
        id="demo-customized-button"
        aria-controls={shoulOpenPopover ? "demo-customized-menu" : undefined}
        aria-haspopup="true"
        aria-expanded={shoulOpenPopover ? "true" : undefined}
        variant="contained"
        onClick={handleOpenPopover}
        endIcon={
          shoulOpenPopover ? <KeyboardArrowUpIcon /> : <KeyboardArrowDownIcon />
        }
      >
        Add Track
      </Button>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={popoverAnchorElement}
        open={shoulOpenPopover}
        onClose={handleClosePopover}
      >
        <MenuItem onClick={handleOpenAddYouTubeTrackStepperModal}>
          <YouTubeIcon />
          From YouTube
        </MenuItem>
        <MenuItem onClick={handleOpenUploadTrackStepperModal}>
          <DriveFolderUploadIcon />
          File Upload
        </MenuItem>
      </StyledMenu>
      {createPortal(
        <AddYouTubeTrackStepper
          showModal={openAddYouTubeTrackStepperModal}
          onClose={handleCloseAddYouTubeTrackStepperModal}
        />,
        document.body
      )}
      {createPortal(
        <AddTrackViaUploadStepper
          showModal={openUploadTrackStepperModal}
          onClose={handleCloseUploadTrackStepperModal}
        />,
        document.body
      )}
    </>
  );
};
