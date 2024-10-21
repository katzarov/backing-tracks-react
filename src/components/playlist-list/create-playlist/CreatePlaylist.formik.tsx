import { useFormik } from "formik";
import * as yup from "yup";

export const createPlaylistFormId = "create-playlist-form";

export const playlistNameKey = "playlistName";
export const playlistDescriptionKey = "playlistDescription";

const createPlaylistValidationSchema = yup.object({
  [playlistNameKey]: yup
    .string()
    .trim()
    .min(1, "Playlist name must be at least 1 character long")
    .max(40, "Playlist name must be at most 40 characters long")
    .required("Playlist name is required"),

  [playlistDescriptionKey]: yup
    .string()
    .trim()
    .min(1, "Playlist description must be at least 1 character long")
    .max(100, "Playlist description must be at most 100 characters long"),
});

export interface ICreatePlaylistFormikState {
  [playlistNameKey]: string;
  [playlistDescriptionKey]: string;
}

export const useCreatePlaylistFormik = (
  handleSubmit: (values: ICreatePlaylistFormikState) => void
) => {
  const formik = useFormik<ICreatePlaylistFormikState>({
    initialValues: {
      [playlistNameKey]: "",
      [playlistDescriptionKey]: "",
    },
    validationSchema: createPlaylistValidationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });

  return formik;
};
