import { FC } from "react";
import { Button } from "@mui/material";
import { useModal } from "@src/hooks/useModal";
import { DeletePlaylistDialog } from "./DeletePlaylistDialog";
import DeleteIcon from "@mui/icons-material/Delete";

interface IDeletePlaylistButtonProps {
  playlistId: number;
  playlistName: string;
  disabled: boolean;
}

export const DeletePlaylistButton: FC<IDeletePlaylistButtonProps> = ({
  playlistId,
  playlistName,
  disabled,
}) => {
  const {
    openModal: shouldOpenDeletePlaylistDialog,
    handleOpenModal: handleOpenDeletePlaylistDialog,
    handleCloseModal: handleCloseDeletePlaylistDialog,
  } = useModal({});

  return (
    <>
      <Button
        size="small"
        variant="text"
        startIcon={<DeleteIcon />}
        disabled={disabled}
        onClick={handleOpenDeletePlaylistDialog}
      >
        Delete playlist
      </Button>
      {shouldOpenDeletePlaylistDialog && (
        <DeletePlaylistDialog
          playlistId={playlistId}
          playlistName={playlistName}
          shouldOpenDeletePlaylistDialog={shouldOpenDeletePlaylistDialog}
          handleCloseDeletePlaylistDialog={handleCloseDeletePlaylistDialog}
        />
      )}
    </>
  );
};
