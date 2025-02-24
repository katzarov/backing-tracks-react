import MenuItem from "@mui/material/MenuItem";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import { AddYouTubeTrackStepper } from "./AddYouTubeTrackStepper";
import { AddTrackViaUploadStepper } from "./AddTrackViaUploadStepper";
import { usePopover } from "../../hooks/usePopover";
import {
  AddTrackViaUploadStepperModalContext,
  AddYouTubeTrackStepperModalContext,
} from "./AddTrackMenu.context";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import { PopoverMenu } from "../shared/PopoverMenu";

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
              }) => {
                return (
                  <>
                    <ListItemButton
                      id="open-add-track-menu-button"
                      aria-controls={
                        shoulOpenPopover ? "add-track-menu" : undefined
                      }
                      aria-haspopup="true"
                      aria-expanded={shoulOpenPopover ? "true" : undefined}
                      onClick={handleOpenPopover}
                      sx={{ marginTop: 6 }}
                    >
                      <ListItemIcon sx={{ minWidth: 0, marginRight: 4 }}>
                        <AddCircleIcon />
                      </ListItemIcon>
                      <ListItemText primary="Add track ..." />
                    </ListItemButton>
                    <PopoverMenu
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
                    </PopoverMenu>
                    {openAddYouTubeTrackStepperModal && (
                      <AddYouTubeTrackStepper />
                    )}
                    {openUploadTrackStepperModal && (
                      <AddTrackViaUploadStepper />
                    )}
                  </>
                );
              }}
            </AddTrackViaUploadStepperModalContext.Consumer>
          </AddTrackViaUploadStepperModalContext.Provider>
        )}
      </AddYouTubeTrackStepperModalContext.Consumer>
    </AddYouTubeTrackStepperModalContext.Provider>
  );
};
