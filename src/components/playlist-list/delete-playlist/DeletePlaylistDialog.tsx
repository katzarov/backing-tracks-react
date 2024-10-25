import { FC } from "react";
import { ConfirmationDialog } from "@src/components/shared/ConfirmationDialog";
import { useDeletePlaylistMutation } from "@src/store/api/playlists";

interface IDeletePlaylistDialogProps {
  playlistId: number;
  playlistName: string;
  shouldOpenDeletePlaylistDialog: boolean;
  handleCloseDeletePlaylistDialog: () => void;
}

export const DeletePlaylistDialog: FC<IDeletePlaylistDialogProps> = ({
  playlistId,
  playlistName,
  shouldOpenDeletePlaylistDialog,
  handleCloseDeletePlaylistDialog,
}) => {
  const [deletePlaylist, { isLoading }] = useDeletePlaylistMutation();

  const handleDeletePlaylistNegative = () => {
    handleCloseDeletePlaylistDialog();
  };

  const handleDeletePlaylistAffirmative = async () => {
    await deletePlaylist(playlistId).unwrap();
    // global side effects of deleting a playlist are handled elsewhere
    handleCloseDeletePlaylistDialog();
  };
  return (
    <ConfirmationDialog
      open={shouldOpenDeletePlaylistDialog}
      affirmativeActionLoading={isLoading}
      title="Please confirm"
      affirmativeButtonText="Delete"
      negativeButtonText="Cancel"
      onCloseNegative={handleDeletePlaylistNegative}
      onCloseAffirmative={handleDeletePlaylistAffirmative}
    >
      {`Are you sure you want to delete ${playlistName} playlist ?`}
    </ConfirmationDialog>
  );
};
