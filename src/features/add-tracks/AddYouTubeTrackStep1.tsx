import { Box, Button, InputAdornment } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import YouTubeIcon from "@mui/icons-material/YouTube";
import { useLazyGetYouTubeVideoInfoQuery } from "../../store/apiSlice";
import { FC } from "react";
import { IAddYouTubeTrackStep1Result } from "./AddYouTubeTrackStepper";

const youtubeUrlKey = "youtubeUrl";

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
  const [fetchYouTubeVideoInfo, { isFetching }] =
    useLazyGetYouTubeVideoInfoQuery();
  const formik = useFormik({
    initialValues: {
      [youtubeUrlKey]: "",
    },
    validationSchema: validationSchema,
    validateOnMount: true,
    onSubmit: (values) => {
      alert(JSON.stringify(values, null, 2));
    },
  });
  // TODO: Trim whitespace

  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (formik.isValid) {
      handleNext();
    }
  };

  const handleNext = async () => {
    try {
      const videoUrl = formik.values[youtubeUrlKey];
      const data = await fetchYouTubeVideoInfo(videoUrl).unwrap();
      setResult({ ...data!, videoUrl });
      goNextStep();
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
        onSubmit={handleOnSubmit}
      >
        <TextField
          id={youtubeUrlKey}
          name={youtubeUrlKey}
          label="Link to YouTube video"
          autoFocus // strict mode breaks it
          // type="text" TODO: investigate, prob don't need the type if we keep disabled the native form validation - noValidate
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
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
          // onChange={(event: React.ChangeEvent<HTMLInputElement>) => {
          //   setName(event.target.value);
          // }}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          disabled={!formik.isValid || isFetching}
          onClick={handleNext}
          sx={{ mr: 1 }}
        >
          Next
        </Button>
      </Box>
    </Box>
  );
};
