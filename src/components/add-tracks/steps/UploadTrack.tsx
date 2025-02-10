import { FC, useEffect } from "react";
import { Box, Button, DialogActions, DialogContent } from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useLazySearchForTrackInSpotifyQuery } from "@api/acquire-tracks";
import { IUploadTrackProps, TrackInstrument, TrackType } from "../interface";
import { VisuallyHiddenInput } from "./UploadTrack.styled";
import {
  formId,
  trackFileKey,
  trackTypeKey,
  trackInstrumentKey,
  useUploadTrackFormik,
  IUploadTrackFormikState,
} from "./UploadTrack.formik";
import { TrackDetails } from "./TrackDetails";
import { AddTrackViaUploadStepperModalContext } from "../AddTrackMenu.context";

export const UploadTrack: FC<IUploadTrackProps> = ({ onStepComplete }) => {
  const { setDisableClose } =
    AddTrackViaUploadStepperModalContext.getUseModalContextHook()();

  const [fetchSearchForTrackInSpotify, { isFetching }] =
    useLazySearchForTrackInSpotifyQuery();

  const formik = useUploadTrackFormik(handleSubmit);

  useEffect(() => {
    if (isFetching) {
      setDisableClose(true);
    } else {
      setDisableClose(false);
    }
    return () => {
      setDisableClose(false);
    };
  }, [isFetching, setDisableClose]);

  async function handleSubmit(values: IUploadTrackFormikState) {
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
  }

  const fileName =
    formik.values[trackFileKey] !== undefined
      ? formik.values[trackFileKey].name
      : "";

  const fileError =
    formik.touched[trackFileKey] && Boolean(formik.errors[trackFileKey]);

  const fileErrorMsg =
    formik.touched[trackFileKey] && formik.errors[trackFileKey];

  return (
    <>
      <DialogContent>
        <Box
          component="form"
          id={formId}
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
            id={`${formId}--file-upload-btn`}
            component="label"
            role={undefined}
            variant="contained"
            tabIndex={-1}
            startIcon={<CloudUploadIcon />}
          >
            Upload file
            <VisuallyHiddenInput
              id={trackFileKey}
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
        </Box>
      </DialogContent>
      <DialogActions>
        <Button
          id={`${formId}--submit`}
          form={formId}
          type="submit"
          loading={isFetching}
          loadingPosition="end"
          disabled={!formik.isValid || isFetching}
        >
          Next
        </Button>
      </DialogActions>
    </>
  );
};
