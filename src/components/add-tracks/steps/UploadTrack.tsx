import { FC } from "react";
import { Box, Button } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLazySearchForTrackInSpotifyQuery } from "@api/acquire-tracks";
import { IUploadTrackProps, TrackInstrument, TrackType } from "../interface";
import { VisuallyHiddenInput } from "./UploadTrack.styled";
import {
  trackFileKey,
  trackTypeKey,
  trackInstrumentKey,
  useUploadTrackFormik,
  IUploadTrackFormikState,
} from "./UploadTrack.formik";
import { TrackDetails } from "./TrackDetails";

export const UplaodTrack: FC<IUploadTrackProps> = ({ onStepComplete }) => {
  const [fetchSearchForTrackInSpotify, { isFetching }] =
    useLazySearchForTrackInSpotifyQuery();

  const handleSubmit = async (values: IUploadTrackFormikState) => {
    try {
      const {
        [trackFileKey]: trackFile,
        [trackTypeKey]: trackType,
        [trackInstrumentKey]: trackInstrument,
      } = values;

      const { name } = trackFile!;

      const searchResults = await fetchSearchForTrackInSpotify({
        query: name,
        limit: 5,
      }).unwrap();

      onStepComplete({
        trackType,
        trackName: name,
        trackInstrument,
        file: trackFile!,
        preliminarySpotifySearchSuggestions: searchResults,
      });
    } catch (e) {
      console.error("error", e);
    }
  };

  const formik = useUploadTrackFormik(handleSubmit);

  const fileName =
    formik.values[trackFileKey] !== undefined
      ? formik.values[trackFileKey].name
      : "";

  const fileError =
    formik.touched[trackFileKey] && Boolean(formik.errors[trackFileKey]);

  const fileErrorMsg =
    formik.touched[trackFileKey] && formik.errors[trackFileKey];

  return (
    <Box sx={{ mt: 6 }}>
      <Box
        component="form"
        encType="multipart/form-data" // TODO: dumbo probably doenst matter cause we are not using the native form post/submit
        sx={{
          "& > :not(style)": { m: 1 },
        }}
        noValidate
        autoComplete="off"
        onSubmit={formik.handleSubmit}
        onBlur={formik.handleBlur}
      >
        <Button
          id="file-upload"
          component="label"
          role={undefined}
          variant="contained"
          tabIndex={-1}
          startIcon={<CloudUploadIcon />}
        >
          Upload file
          <VisuallyHiddenInput
            name={trackFileKey}
            type="file"
            accept="audio/mpeg"
            disabled={isFetching}
            onChange={(e) =>
              formik.setFieldValue(
                trackFileKey,
                e.target.files && e.target.files.length > 0
                  ? e.target.files[0]
                  : undefined
              )
            }
          />
        </Button>

        {fileError && fileErrorMsg}

        {fileName}

        <TrackDetails
          trackTypeKey={trackTypeKey}
          trackTypeValue={formik.values[trackTypeKey]}
          trackInstrumentKey={trackInstrumentKey}
          trackInstrumentValue={formik.values[trackInstrumentKey]}
          disabled={isFetching}
          onTrackTypeBackingClick={() =>
            formik.setFieldValue(trackTypeKey, TrackType.BACKING)
          }
          onTrackTypeJamClick={() =>
            formik.setFieldValue(trackTypeKey, TrackType.JAM)
          }
          onTrackInstrumentGuitarClick={() =>
            formik.setFieldValue(trackInstrumentKey, TrackInstrument.GUITAR)
          }
          onTrackInstrumentBassClick={() =>
            formik.setFieldValue(trackInstrumentKey, TrackInstrument.BASS)
          }
        />

        <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
          <Box sx={{ flex: "1 1 auto" }} />
          <Button
            id="submit"
            type="submit"
            disabled={!formik.isValid || isFetching}
            sx={{ mr: 1 }}
          >
            Next
          </Button>
        </Box>
      </Box>
    </Box>
  );
};
