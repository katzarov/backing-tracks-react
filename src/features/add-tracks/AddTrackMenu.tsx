import { createPortal } from "react-dom";
import { styled, alpha } from "@mui/material/styles";
import Button from "@mui/material/Button";
import Menu, { MenuProps } from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import YouTubeIcon from "@mui/icons-material/YouTube";
import DriveFolderUploadIcon from "@mui/icons-material/DriveFolderUpload";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@mui/icons-material/KeyboardArrowUp";
import { AddYouTubeTrack } from "./AddYouTubeTrackStepper";
import { AddTrackViaUploadStepper } from "./AddTrackViaUploadStepper";
import { useModal } from "../../hooks/useModal";
import { usePopover } from "../../hooks/usePopover";

const StyledMenu = styled((props: MenuProps) => (
  <Menu
    anchorOrigin={{
      vertical: "bottom",
      horizontal: "right",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    borderRadius: 6,
    marginTop: theme.spacing(1),
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

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
        <AddYouTubeTrack
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
