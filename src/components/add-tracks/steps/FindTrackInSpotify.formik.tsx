import { useFormik } from "formik";
import * as yup from "yup";

export const formId = "find-track-in-spotify-form";
export const trackNameKey = `${formId}--trackName`;

const findTrackInSpotifyValidationSchema = yup.object({
  [trackNameKey]: yup
    .string()
    .trim()
    .min(3, "Track name must be at least 3 character long")
    .max(100, "Track name must be at most 100 characters long")
    .required("Track name is required"),
});

export interface IFindTrackInSpotifyFormikState {
  [trackNameKey]: string;
}

export const useFindTrackInSpotifyFormik = (
  preliminaryTrackName: string,
  handleSubmit: (values: IFindTrackInSpotifyFormikState) => void,
  onResetAllSteps: () => void
) => {
  const formik = useFormik<IFindTrackInSpotifyFormikState>({
    initialValues: {
      [trackNameKey]: preliminaryTrackName,
    },
    validationSchema: findTrackInSpotifyValidationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
    onReset: () => {
      onResetAllSteps();
    },
  });

  return formik;
};
