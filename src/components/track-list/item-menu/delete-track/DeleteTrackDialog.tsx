import { FC } from "react";
import { IndexedDB } from "@lib/browser-storage";
import { useDeleteTrackMutation } from "@api/tracks";
import { AlertDialog } from "../../../shared/AlertDialog";

interface IDeleteTrackDialogProps {
  resourceId: string;
  trackName: string;
  artistName: string;
  shouldOpenDeleteConfirmationDialog: boolean;
  handleCloseDeleteConfirmationDialog: () => void;
}

export const DeleteTrackDialog: FC<IDeleteTrackDialogProps> = ({
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
    await deleteTrack(resourceId).unwrap();
    await IndexedDB.getInstance().delete(IndexedDB.trackStore, resourceId);
    handleCloseDeleteConfirmationDialog();
  };
  return (
    <AlertDialog
      open={shouldOpenDeleteConfirmationDialog}
      showSpinner={isLoading}
      title="Please confirm"
      content={`Are you sure you want to delete the ${trackName} by ${artistName}?`}
      affirmativeButtonText="Delete"
      negativeButtonText="Cancel"
      onCloseNegative={handleDeleteTrackNegative}
      onCloseAffirmative={handleDeleteTrackAffirmative}
    ></AlertDialog>
  );
};
