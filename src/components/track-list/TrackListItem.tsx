import { Link } from "react-router-dom";
import { FC } from "react";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import IconButton from "@mui/material/IconButton";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import DeleteIcon from "@mui/icons-material/Delete";
import { StyledMenu } from "./TrackListItem.styled";
import { formatFromSeconds } from "../../utils/utils";
import { TrackType } from "../add-tracks/interface";
import { MenuItem } from "@mui/material";
import { useDeleteTrackMutation } from "../../store/api/tracks";
import { usePopover } from "../../hooks/usePopover";
import { useModal } from "../../hooks/useModal";
import { AlertDialog } from "../shared/AlertDialog";
import { IndexedDB } from "../../lib/browser-storage";

interface ITrackListItemProps {
  index: number;
  resourceId: string;
  trackName: string;
  artistName: string;
  trackType: TrackType;
  duration: number;
}

export const TrackListItem: FC<ITrackListItemProps> = ({
  index,
  resourceId,
  trackName,
  trackType,
  artistName,
  duration,
}) => {
  const {
    popoverAnchorElement,
    shoulOpenPopover,
    handleOpenPopover,
    handleClosePopover,
  } = usePopover();

  const {
    openModal: shouldOpenDeleteConfirmationDialog,
    handleOpenModal: handleOpenDeleteConfirmationDialog,
    handleCloseModal: handleCloseDeleteConfirmationDialog,
  } = useModal({
    cbBeforeOpen: handleClosePopover,
  });

  const [deleteTrack, { isLoading }] = useDeleteTrackMutation();

  const handleNegative = () => {
    handleCloseDeleteConfirmationDialog();
  };

  const handleAffirmative = async () => {
    await deleteTrack(resourceId).unwrap();
    await IndexedDB.getInstance().delete(IndexedDB.trackStore, resourceId);
    handleCloseDeleteConfirmationDialog();
  };

  return (
    <ListItem
      //   key={resourceId}
      disablePadding
      alignItems="center"
      sx={{ width: "100%" }}
      secondaryAction={
        <IconButton
          edge="end"
          aria-label="comments"
          onClick={handleOpenPopover}
        >
          <MoreVertIcon />
        </IconButton>
      }
    >
      <ListItemButton component={Link} to={`track/${resourceId}`}>
        <ListItemText primary={index + 1} sx={{ width: 50 }} />
        <ListItemText
          primary={trackName}
          secondary={artistName}
          sx={{ width: "100%" }}
        />
        <ListItemText secondary={trackType} sx={{ width: 100 }} />
        <ListItemText
          secondary={formatFromSeconds(duration)}
          sx={{ width: 50 }}
        />
      </ListItemButton>
      <StyledMenu
        id="demo-customized-menu"
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={popoverAnchorElement}
        open={shoulOpenPopover}
        onClose={handleClosePopover}
      >
        <MenuItem onClick={handleOpenDeleteConfirmationDialog}>
          <DeleteIcon />
          Delete track
        </MenuItem>
      </StyledMenu>
      <AlertDialog
        open={shouldOpenDeleteConfirmationDialog}
        showSpinner={isLoading}
        title="Please confirm"
        textContent={`Are you sure you want to delete the ${trackName} by ${artistName}?`}
        affirmativeButtonText="Delete"
        negativeButtonText="Cancel"
        onCloseNegative={handleNegative}
        onCloseAffirmative={handleAffirmative}
      ></AlertDialog>
    </ListItem>
  );
};
