import { FC } from "react";
import { Box, Button, InputAdornment, Typography } from "@mui/material";
import ToggleButton from "@mui/material/ToggleButton";
import ToggleButtonGroup from "@mui/material/ToggleButtonGroup";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import YouTubeIcon from "@mui/icons-material/YouTube";
import {
  useLazyGetYouTubeVideoInfoQuery,
  useLazySearchForTrackInSpotifyQuery,
} from "../../store/api/acquireTracks";
import {
  IAddYouTubeTrackStep1Result,
  ITrackType,
} from "./AddYouTubeTrackStepper";

const youtubeUrlKey = "youtubeUrl";
const trackTypeKey = "trackType";

const validationSchema = yup.object({
  [youtubeUrlKey]: yup
    .string()
    .url("Enter a valid YouTube link")
    .required("YouTube link is required")
    .test(
      "is-youtube-url",
      "This is not a link under the YouTube domain",
      (value, context) => {
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

interface IAddYouTubeTrackStep1Props {
  goNextStep: () => void;
  setResult: (videoInfo: IAddYouTubeTrackStep1Result) => void;
}

export const AddYouTubeTrackStep1: FC<IAddYouTubeTrackStep1Props> = ({
  goNextStep,
  setResult,
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
    [trackTypeKey]: ITrackType;
  }>({
    initialValues: {
      [youtubeUrlKey]: "",
      [trackTypeKey]: "backing",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: () => {
      handleSubmit();
    },
  });
  // TODO: Trim whitespace

  const handleSubmit = async () => {
    try {
      const { [youtubeUrlKey]: videoUrl, [trackTypeKey]: trackType } =
        formik.values;
      const youtubeResult = await fetchYouTubeVideoInfo(videoUrl).unwrap();
      // TODO strip "backing track" from name, quality, high quality etc. see if name is in keywords and incl keyword. Do this on BE
      const { title } = youtubeResult;
      const searchResults = await fetchSearchForTrackInSpotify({
        query: title,
        limit: 5,
      }).unwrap();

      setResult({
        ...youtubeResult,
        videoUrl,
        trackType,
        searchResults,
      });
      goNextStep(); // TODO remove from props and do in parent on setResult
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
            onClick={() => formik.setFieldValue(trackTypeKey, "backing")}
            id="backing"
            value="backing"
          >
            Backing Track
          </ToggleButton>
          <ToggleButton
            onClick={() => formik.setFieldValue(trackTypeKey, "jam")}
            id="jam"
            value="jam"
          >
            Jam Track
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
