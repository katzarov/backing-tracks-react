import { FC } from "react";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useFormik } from "formik";
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
import {
  linkToYouTubeTrackValidationSchema,
  trackTypeKey,
  trackInstrumentKey,
  youtubeUrlKey,
} from "./validation";

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

  // TODO:
  const isFetching =
    isFetchingYoutube ||
    (isSuccessYoutube && isUninitializedSearch) ||
    isFetchingSearch;

  const formik = useFormik<{
    [youtubeUrlKey]: string;
    [trackTypeKey]: TrackType;
    [trackInstrumentKey]: TrackInstrument;
  }>({
    initialValues: {
      [youtubeUrlKey]: "",
      [trackTypeKey]: TrackType.BACKING,
      [trackInstrumentKey]: TrackInstrument.GUITAR,
    },
    validationSchema: linkToYouTubeTrackValidationSchema,
    validateOnMount: true,
    onSubmit: () => {
      handleSubmit();
    },
  });
  // TODO: Trim whitespace

  const handleSubmit = async () => {
    try {
      const {
        [youtubeUrlKey]: videoUrl,
        [trackTypeKey]: trackType,
        [trackInstrumentKey]: trackInstrument,
      } = formik.values;
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
