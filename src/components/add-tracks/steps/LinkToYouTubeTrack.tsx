import { FC, useEffect } from "react";
import { Box, Button, InputAdornment } from "@mui/material";
import TextField from "@mui/material/TextField";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  useLazyGetYouTubeVideoInfoQuery,
  useLazySearchForTrackInSpotifyQuery,
} from "@api/acquire-tracks";
import {
  ILinkToYouTubeTrackProps,
  TrackInstrument,
  TrackType,
} from "../interface";
import { TrackDetails } from "./TrackDetails";
import {
  ILinkToYouTubeTrackFormikState,
  trackTypeKey,
  trackInstrumentKey,
  youtubeUrlKey,
  useLinkToYouTubeTrackFormik,
  formId,
} from "./LinkToYouTubeTrack.formik";
import { AddYouTubeTrackStepperModalContext } from "../AddTrackMenu.context";
import { DialogActions, DialogContent } from "@mui/material";

export const LinkToYouTubeTrack: FC<ILinkToYouTubeTrackProps> = ({
  onStepComplete,
}) => {
  const { setDisableClose } =
    AddYouTubeTrackStepperModalContext.getUseModalContextHook()();

  const [
    fetchYouTubeVideoInfo,
    { isFetching: isFetchingYoutube, isSuccess: isSuccessYoutube },
  ] = useLazyGetYouTubeVideoInfoQuery();

  const [
    fetchSearchForTrackInSpotify,
    { isFetching: isFetchingSearch, isUninitialized: isUninitializedSearch },
  ] = useLazySearchForTrackInSpotifyQuery();

  const formik = useLinkToYouTubeTrackFormik(handleSubmit);

  const isFetching =
    isFetchingYoutube ||
    (isSuccessYoutube && isUninitializedSearch) ||
    isFetchingSearch;

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

  async function handleSubmit(values: ILinkToYouTubeTrackFormikState) {
    try {
      const {
        [youtubeUrlKey]: videoUrl,
        [trackTypeKey]: trackType,
        [trackInstrumentKey]: trackInstrument,
      } = values;
      const youtubeResult = await fetchYouTubeVideoInfo(videoUrl).unwrap();
      const { title } = youtubeResult;
      const searchResults = await fetchSearchForTrackInSpotify({
        query: title,
        limit: 5,
      }).unwrap();

      onStepComplete({
        trackType,
        trackName: title,
        trackInstrument,
        youtubeUrl: videoUrl,
        preliminarySpotifySearchSuggestions: searchResults,
      });
    } catch (e) {
      // TODO: (likely video ID not found) propagate the error msg from the youtube ms to here. and show some error alert.
      console.error("error", e);
    }
  }

  return (
    <>
      <DialogContent>
        <Box
          component="form"
          id={formId}
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
            id={youtubeUrlKey}
            name={youtubeUrlKey}
            label="Link to YouTube video"
            autoFocus // strict mode breaks it
            disabled={isFetching}
            fullWidth
            value={formik.values[youtubeUrlKey]}
            error={
              formik.touched[youtubeUrlKey] &&
              Boolean(formik.errors[youtubeUrlKey])
            }
            helperText={
              formik.touched[youtubeUrlKey] && formik.errors[youtubeUrlKey]
            }
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <YouTubeIcon />
                </InputAdornment>
              ),
            }}
          />

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
