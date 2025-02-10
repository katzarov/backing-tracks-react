import * as yup from "yup";
import { useFormik } from "formik";
import { TrackInstrument, TrackType } from "../interface";

export const formId = "upload-track-form";
export const trackFileKey = `${formId}--trackFile`;
export const trackTypeKey = `${formId}--trackType`;
export const trackInstrumentKey = `${formId}--trackInstrument`;

const uploadTrackValidationSchema = yup.object({
  [trackFileKey]: yup
    .mixed<File>()
    .required("File upload is required")
    .test("fileFormat", "Only MP3 files are allowed", (value) => {
      if (value.type !== "audio/mpeg") {
        return false;
      }
      return true;
    })
    .test("fileSize", "File size must not be more than 20MB", (value) => {
      if (value.size > 20000000) {
        return false;
      }
      return true;
    }),
});

export interface IUploadTrackFormikState {
  [trackFileKey]: File | undefined;
  [trackTypeKey]: TrackType;
  [trackInstrumentKey]: TrackInstrument;
}

export const useUploadTrackFormik = (
  handleSubmit: (values: IUploadTrackFormikState) => void
) => {
  const formik = useFormik<IUploadTrackFormikState>({
    initialValues: {
      [trackFileKey]: undefined,
      [trackTypeKey]: TrackType.BACKING,
      [trackInstrumentKey]: TrackInstrument.GUITAR,
    },
    validationSchema: uploadTrackValidationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      handleSubmit(values);
    },
  });
  // TODO: Trim whitespace

  return formik;
};
