import { FC } from "react";
import { useCreatePlaylistMutation } from "@src/store/api/playlists";
import {
  Box,
  Button,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from "@mui/material";
import {
  useCreatePlaylistFormik,
  playlistNameKey,
  playlistDescriptionKey,
  ICreatePlaylistFormikState,
  createPlaylistFormId,
} from "./CreatePlaylist.formik";
import { Dialog } from "@src/components/shared/Dialog";

interface ICreatePlaylistDialogProps {
  shouldOpenCreatePlaylistDialog: boolean;
  handleCloseCreatePlaylistDialog: () => void;
}

// TODO: create a shared modal component for form content. Need to create some shared form components - like textfields, action buttons etc
// TODO: For all forms/dialogs. separate from dialog, as we may not want to have it as a dialog. create a *.form.tsx and *.dialog.tsx and corresponding *.form.interface.ts and *.dialog.interface.ts that consumers must implement. Also, do it with React Context and less props passing around.
// TODO: feat: bulk add tracks to newly created playlist as next step
export const CreatePlaylistDialog: FC<ICreatePlaylistDialogProps> = ({
  shouldOpenCreatePlaylistDialog,
  handleCloseCreatePlaylistDialog,
}) => {
  const [createPlaylist, { isLoading }] = useCreatePlaylistMutation();

  const onCloseModal = () => {
    if (isLoading) {
      return;
    }
    handleCloseCreatePlaylistDialog();
  };

  const handleSubmit = async (values: ICreatePlaylistFormikState) => {
    const {
      [playlistNameKey]: playlistName,
      [playlistDescriptionKey]: playlistDescription,
    } = values;

    try {
      await createPlaylist({
        name: playlistName,
        description:
          playlistDescription !== "" ? playlistDescription : undefined,
      }).unwrap();

      handleCloseCreatePlaylistDialog();
    } catch (err: unknown) {
      // TODO check how to type this err
      if (
        typeof err === "object" &&
        err !== null &&
        "status" in err &&
        err.status === 409
      ) {
        formik.setFieldError(
          playlistNameKey,
          `${playlistName} already exists.`
        );
      }
    }
  };
  const formik = useCreatePlaylistFormik(handleSubmit);

  return (
    <Dialog
      open={shouldOpenCreatePlaylistDialog}
      disableClose={isLoading}
      onClose={onCloseModal}
    >
      <DialogTitle>Create new playlist</DialogTitle>

      <DialogContent>
        <Box
          component="form"
          id={createPlaylistFormId}
          sx={{
            "& > :not(style)": { m: 1 },
          }}
          noValidate
          autoComplete="off"
          onSubmit={formik.handleSubmit}
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        >
          <TextField
            type="text"
            id={playlistNameKey}
            name={playlistNameKey}
            label="Playlist name"
            autoFocus
            disabled={isLoading}
            fullWidth
            value={formik.values[playlistNameKey]}
            error={
              formik.touched[playlistNameKey] &&
              Boolean(formik.errors[playlistNameKey])
            }
            helperText={
              formik.touched[playlistNameKey] && formik.errors[playlistNameKey]
            }
          />

          <TextField
            type="text"
            multiline
            id={playlistDescriptionKey}
            name={playlistDescriptionKey}
            label="Optional: Playlist description"
            disabled={isLoading}
            fullWidth
            value={formik.values[playlistDescriptionKey]}
            error={
              formik.touched[playlistDescriptionKey] &&
              Boolean(formik.errors[playlistDescriptionKey])
            }
            helperText={
              formik.touched[playlistDescriptionKey] &&
              formik.errors[playlistDescriptionKey]
            }
          />
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          form={createPlaylistFormId}
          id="reset"
          type="reset"
          disabled={isLoading}
          onClick={onCloseModal}
        >
          Cancel
        </Button>
        <Button
          form={createPlaylistFormId}
          id="submit"
          type="submit"
          disabled={!formik.isValid || isLoading}
        >
          Create
        </Button>
      </DialogActions>
    </Dialog>
  );
};
