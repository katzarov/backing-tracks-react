import { FC } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import BookmarkIcon from "@mui/icons-material/Bookmark";
import { MenuItem } from "@mui/material";
import { StyledMenu } from "./TrackListItemMenu.styled";
import { ITrackResponseDto } from "../../../store/api/tracks";
import { useModal } from "../../../hooks/useModal";
import { EditPlaylistsOfTrackDialog } from "./edit-playlists-of-track/EditPlaylistsOfTrackDialog";
import { DeleteTrackDialog } from "./delete-track/DeleteTrackDialog";

interface ITrackListItemMenuProps {
  trackId: number;
  resourceId: string;
  trackName: string;
  artistName: string;
  playlists: ITrackResponseDto["playlists"];
  popoverAnchorElement: HTMLElement | null;
  shoulOpenPopover: boolean;
  handleClosePopover: () => void;
}

export const TrackListItemMenu: FC<ITrackListItemMenuProps> = ({
  trackId,
  resourceId,
  trackName,
  artistName,
  playlists,
  popoverAnchorElement,
  shoulOpenPopover,
  handleClosePopover,
}) => {
  const {
    openModal: shouldOpenEditPlaylistsOfTrackDialog,
    handleOpenModal: handleOpenEditPlaylistsOfTrackDialog,
    handleCloseModal: handleCloseEditPlaylistsOfTrackDialog,
  } = useModal({
    cbBeforeOpen: handleClosePopover,
  });

  const {
    openModal: shouldOpenDeleteConfirmationDialog,
    handleOpenModal: handleOpenDeleteConfirmationDialog,
    handleCloseModal: handleCloseDeleteConfirmationDialog,
  } = useModal({
    cbBeforeOpen: handleClosePopover,
  });

  return (
    <>
      <StyledMenu
        MenuListProps={{
          "aria-labelledby": "demo-customized-button",
        }}
        anchorEl={popoverAnchorElement}
        open={shoulOpenPopover}
        onClose={handleClosePopover}
      >
        <MenuItem onClick={handleOpenEditPlaylistsOfTrackDialog}>
          <BookmarkIcon />
          Save to playlist
        </MenuItem>
        <MenuItem onClick={handleOpenDeleteConfirmationDialog}>
          <DeleteIcon />
          Delete track
        </MenuItem>
      </StyledMenu>
      {shouldOpenEditPlaylistsOfTrackDialog && (
        <EditPlaylistsOfTrackDialog
          trackId={trackId}
          shouldOpenEditPlaylistsOfTrackDialog={
            shouldOpenEditPlaylistsOfTrackDialog
          }
          handleCloseEditPlaylistsOfTrackDialog={
            handleCloseEditPlaylistsOfTrackDialog
          }
          playlists={playlists}
        />
      )}
      {shouldOpenDeleteConfirmationDialog && (
        <DeleteTrackDialog
          resourceId={resourceId}
          trackName={trackName}
          artistName={artistName}
          shouldOpenDeleteConfirmationDialog={
            shouldOpenDeleteConfirmationDialog
          }
          handleCloseDeleteConfirmationDialog={
            handleCloseDeleteConfirmationDialog
          }
        />
      )}
    </>
  );
};
