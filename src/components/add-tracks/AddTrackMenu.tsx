import Button from "@mui/material/Button";
import MenuItem from "@mui/material/MenuItem";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { StyledMenu } from "./AddTrackMenu.styled";
import { AddYouTubeTrackStepper } from "./AddYouTubeTrackStepper";
import { AddTrackViaUploadStepper } from "./AddTrackViaUploadStepper";
import { usePopover } from "../../hooks/usePopover";
import {
  AddTrackViaUploadStepperModalContext,
  AddYouTubeTrackStepperModalContext,
} from "./AddTrackMenu.context";

export const AddTrackMenu = () => {
  const {
    popoverAnchorElement,
    shoulOpenPopover,
    handleOpenPopover,
    handleClosePopover,
  } = usePopover();

  return (
    <AddYouTubeTrackStepperModalContext.Provider
      cbBeforeOpen={handleClosePopover}
    >
      <AddYouTubeTrackStepperModalContext.Consumer>
        {({
          openModal: openAddYouTubeTrackStepperModal,
          handleOpenModal: handleOpenAddYouTubeTrackStepperModal,
        }) => (
          <AddTrackViaUploadStepperModalContext.Provider
            cbBeforeOpen={handleClosePopover}
          >
            <AddTrackViaUploadStepperModalContext.Consumer>
              {({
                openModal: openUploadTrackStepperModal,
                handleOpenModal: handleOpenUploadTrackStepperModal,
              }) => (
                <>
                  <Button
                    id="open-add-track-menu-button"
                    aria-controls={
                      shoulOpenPopover ? "add-track-menu" : undefined
                    }
                    aria-haspopup="true"
                    aria-expanded={shoulOpenPopover ? "true" : undefined}
                    variant="contained"
                    onClick={handleOpenPopover}
                    endIcon={
                      shoulOpenPopover ? (
                        <KeyboardArrowUpIcon />
                      ) : (
                        <KeyboardArrowDownIcon />
                      )
                    }
                  >
                    Add Track
                  </Button>
                  <StyledMenu
                    id="add-track-menu-button"
                    MenuListProps={{
                      "aria-labelledby": "add-track-buttons",
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
                  {openAddYouTubeTrackStepperModal && (
                    <AddYouTubeTrackStepper />
                  )}
                  {openUploadTrackStepperModal && <AddTrackViaUploadStepper />}
                </>
              )}
            </AddTrackViaUploadStepperModalContext.Consumer>
          </AddTrackViaUploadStepperModalContext.Provider>
        )}
      </AddYouTubeTrackStepperModalContext.Consumer>
    </AddYouTubeTrackStepperModalContext.Provider>
  );
};
