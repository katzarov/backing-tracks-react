import { ListItemButton, ListItemIcon, ListItemText } from "@mui/material";
import AddCircleIcon from "@mui/icons-material/AddCircle";
import { useModal } from "@src/hooks/useModal";
import { CreatePlaylistDialog } from "./CreatePlaylistDialog.tsx";

export const CreatePlaylistButton = () => {
  const {
    openModal: shouldOpenCreatePlaylistDialog,
    handleOpenModal: handleOpenCreatePlaylistDialog,
    handleCloseModal: handleCloseCreatePlaylistDialog,
  } = useModal({});

  return (
    <>
      {/* TODO should not be listItem */}
      <ListItemButton
        onClick={handleOpenCreatePlaylistDialog}
        sx={{ flexGrow: 0 }}
      >
        <ListItemIcon>
          <AddCircleIcon />
        </ListItemIcon>
        <ListItemText primary="Add playlist" />
      </ListItemButton>
      {shouldOpenCreatePlaylistDialog && (
        <CreatePlaylistDialog
          shouldOpenCreatePlaylistDialog={shouldOpenCreatePlaylistDialog}
          handleCloseCreatePlaylistDialog={handleCloseCreatePlaylistDialog}
        />
      )}
    </>
  );
};
