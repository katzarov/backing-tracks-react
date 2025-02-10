import * as yup from "yup";
import { useFormik } from "formik";
import { TrackInstrument, TrackType } from "../interface";

export const formId = "link-to-youtube-track-form";
export const youtubeUrlKey = `${formId}--youtubeUrl`;
export const trackTypeKey = `${formId}--trackType`;
export const trackInstrumentKey = `${formId}--trackInstrument`;

const linkToYouTubeTrackValidationSchema = yup.object({
  [youtubeUrlKey]: yup
    .string()
    .url("Enter a valid YouTube link")
    .required("YouTube link is required")
    .test(
      "is-youtube-url",
      "This is not a link under the YouTube domain",
      (value) => {
        if (!URL.canParse(value)) {
          return false;
        }
        const url = new URL(value);
        if (
          url.protocol !== "https:" ||
          (url.hostname !== "www.youtube.com" &&
            url.hostname !== "youtube.com" &&
            url.hostname !== "youtu.be")
        ) {
          return false;
        }

        return true;
      }
    ),
});

export interface ILinkToYouTubeTrackFormikState {
  [youtubeUrlKey]: string;
  [trackTypeKey]: TrackType;
  [trackInstrumentKey]: TrackInstrument;
}

export const useLinkToYouTubeTrackFormik = (
  handleSubmit: (values: ILinkToYouTubeTrackFormikState) => void
) => {
  // TODO: consider using formik via react context. I dont even remember why I started using it like this.
  const formik = useFormik<ILinkToYouTubeTrackFormikState>({
    initialValues: {
      [youtubeUrlKey]: "",
      [trackTypeKey]: TrackType.BACKING,
      [trackInstrumentKey]: TrackInstrument.GUITAR,
    },
    validationSchema: linkToYouTubeTrackValidationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  // TODO: Trim whitespace

  return formik;
};
