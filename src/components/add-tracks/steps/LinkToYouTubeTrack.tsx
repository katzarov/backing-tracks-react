import { FC } from "react";
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
} from "./LinkToYouTubeTrack.formik";

export const LinkToYouTubeTrack: FC<ILinkToYouTubeTrackProps> = ({
  onStepComplete,
}) => {
  const [
    fetchYouTubeVideoInfo,
    { isFetching: isFetchingYoutube, isSuccess: isSuccessYoutube },
  ] = useLazyGetYouTubeVideoInfoQuery();

  const [
    fetchSearchForTrackInSpotify,
    { isFetching: isFetchingSearch, isUninitialized: isUninitializedSearch },
  ] = useLazySearchForTrackInSpotifyQuery();

  const isFetching =
    isFetchingYoutube ||
    (isSuccessYoutube && isUninitializedSearch) ||
    isFetchingSearch;

  const handleSubmit = async (values: ILinkToYouTubeTrackFormikState) => {
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
  };

  const formik = useLinkToYouTubeTrackFormik(handleSubmit);

  return (
    <Box sx={{ mt: 6 }}>
      <Box
        component="form"
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
