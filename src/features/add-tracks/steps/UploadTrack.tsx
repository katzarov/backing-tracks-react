import { FC } from "react";
import { Box, Button, Typography, styled } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useFormik } from "formik";
import { useLazySearchForTrackInSpotifyQuery } from "../../../store/api/acquireTracks";
import { IUploadTrackProps, TrackInstrument, TrackType } from "../interface";
import {
  trackFileKey,
  trackTypeKey,
  trackInstrumentKey,
  uploadTrackValidationSchema,
} from "./validation";

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

export const UplaodTrack: FC<IUploadTrackProps> = ({ onStepComplete }) => {
  const [fetchSearchForTrackInSpotify, { isFetching }] =
    useLazySearchForTrackInSpotifyQuery();

  const formik = useFormik<{
    [trackFileKey]: File | undefined;
    [trackTypeKey]: TrackType;
    [trackInstrumentKey]: TrackInstrument;
  }>({
    initialValues: {
      [trackFileKey]: undefined,
      [trackTypeKey]: TrackType.BACKING,
      [trackInstrumentKey]: TrackInstrument.GUITAR,
    },
    validationSchema: uploadTrackValidationSchema,
    validateOnMount: true,
    onSubmit: () => {
      handleSubmit();
    },
  });
  // TODO: Trim whitespace

  const handleSubmit = async () => {
    try {
      const {
        [trackFileKey]: trackFile,
        [trackTypeKey]: trackType,
        [trackInstrumentKey]: trackInstrument,
      } = formik.values;

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
            onChange={(e) =>
              formik.setFieldValue(trackFileKey, e.target.files[0])
            }
          />
        </Button>

        {fileError && fileErrorMsg}

        {fileName}

        <Typography variant="subtitle1">
          Is this a backing track or a jam track ?
        </Typography>
        <ToggleButtonGroup
          id={trackTypeKey}
          color="primary"
          value={formik.values[trackTypeKey]}
          disabled={isFetching}
          exclusive
          aria-label="Track type"
        >
          <ToggleButton
            onClick={() =>
              formik.setFieldValue(trackTypeKey, TrackType.BACKING)
            }
            id="backing"
            value={TrackType.BACKING}
          >
            Backing Track
          </ToggleButton>
          <ToggleButton
            onClick={() => formik.setFieldValue(trackTypeKey, TrackType.JAM)}
            id="jam"
            value={TrackType.JAM}
          >
            Jam Track
          </ToggleButton>
        </ToggleButtonGroup>
        <Typography variant="subtitle1">
          Is this track for guitar or bass ?
        </Typography>
        <ToggleButtonGroup
          id={trackInstrumentKey}
          color="primary"
          value={formik.values[trackInstrumentKey]}
          disabled={isFetching}
          exclusive
          aria-label="Track type"
        >
          <ToggleButton
            onClick={() =>
              formik.setFieldValue(trackInstrumentKey, TrackInstrument.GUITAR)
            }
            id="guitar"
            value={TrackInstrument.GUITAR}
          >
            Guitar
          </ToggleButton>
          <ToggleButton
            onClick={() =>
              formik.setFieldValue(trackInstrumentKey, TrackInstrument.BASS)
            }
            id="bass"
            value={TrackInstrument.BASS}
          >
            Bass
          </ToggleButton>
        </ToggleButtonGroup>
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
