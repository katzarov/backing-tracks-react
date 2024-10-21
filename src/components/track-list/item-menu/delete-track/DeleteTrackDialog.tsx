import { FC } from "react";
import { IndexedDB } from "@lib/browser-storage";
import { useDeleteTrackMutation } from "@api/tracks";
import { ConfirmationDialog } from "../../../shared/ConfirmationDialog";

interface IDeleteTrackDialogProps {
  trackId: number;
  resourceId: string;
  trackName: string;
  artistName: string;
  shouldOpenDeleteConfirmationDialog: boolean;
  handleCloseDeleteConfirmationDialog: () => void;
}

export const DeleteTrackDialog: FC<IDeleteTrackDialogProps> = ({
  trackId,
  resourceId,
  trackName,
  artistName,
  shouldOpenDeleteConfirmationDialog,
  handleCloseDeleteConfirmationDialog,
}) => {
  const [deleteTrack, { isLoading }] = useDeleteTrackMutation();

  const handleDeleteTrackNegative = () => {
    handleCloseDeleteConfirmationDialog();
  };

  const handleDeleteTrackAffirmative = async () => {
    await deleteTrack(trackId).unwrap();
    await IndexedDB.getInstance().delete(IndexedDB.trackStore, resourceId);
    handleCloseDeleteConfirmationDialog();
  };
  return (
    <ConfirmationDialog
      open={shouldOpenDeleteConfirmationDialog}
      affirmativeActionLoading={isLoading}
      title="Please confirm"
      affirmativeButtonText="Delete"
      negativeButtonText="Cancel"
      onCloseNegative={handleDeleteTrackNegative}
      onCloseAffirmative={handleDeleteTrackAffirmative}
    >
      {`Are you sure you want to delete the ${trackName} by ${artistName}?`}
    </ConfirmationDialog>
  );
};
