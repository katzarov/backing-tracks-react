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
      <ListItemButton
        onClick={handleOpenCreatePlaylistDialog}
        sx={(theme) => ({ py: theme.spacing(0.5), flexGrow: 0 })}
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
