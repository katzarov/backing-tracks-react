import { Box, Button } from "@mui/material";
import { useFormik } from "formik";
import * as yup from "yup";
import TextField from "@mui/material/TextField";
import { useAddYouTubeVideoMutation } from "../../store/apiSlice";
import { FC } from "react";
import { IAddYouTubeTrackStep1Result } from "./AddYouTubeTrackStepper";

const trackNameKey = "trackName";

const validationSchema = yup.object({
  [trackNameKey]: yup
    .string()
    .min(1, "Track name must be at least 1 character long")
    .max(100, "Track name must be at most 100 characters long")
    .required("Track name is required"),
});

interface IAddYouTubeTrackStep2Props {
  videoInfo: IAddYouTubeTrackStep1Result;
  completeSteps: () => void;
  resetSteps: () => void;
}

export const AddYouTubeTrackStep2: FC<IAddYouTubeTrackStep2Props> = ({
  videoInfo,
  completeSteps,
  resetSteps,
}) => {
  const [addYouTubeTrack, { isLoading }] = useAddYouTubeVideoMutation();
  const formik = useFormik({
    initialValues: {
      [trackNameKey]: videoInfo.title,
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
      handleComplete();
    }
  };

  const handleComplete = async () => {
    try {
      const reqBody = {
        url: videoInfo.videoUrl,
        name: formik.values[trackNameKey],
      };
      await addYouTubeTrack(reqBody).unwrap(); //TODO, we doing long polling here. Req might timeout.
      completeSteps();
    } catch (e) {
      // TODO: Propagate the error msg from the youtube ms to here. and show some error alert.
      console.error("error", e);
    }
  };

  return (
    <Box sx={{ mt: 10 }}>
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
          id={trackNameKey}
          name={trackNameKey}
          label="Track name"
          disabled={isLoading}
          fullWidth
          value={formik.values[trackNameKey]}
          error={
            formik.touched[trackNameKey] && Boolean(formik.errors[trackNameKey])
          }
          helperText={
            formik.touched[trackNameKey] && formik.errors[trackNameKey]
          }
          onBlur={formik.handleBlur}
          onChange={formik.handleChange}
        />
      </Box>

      <Box sx={{ display: "flex", flexDirection: "row", pt: 2 }}>
        <Button
          color="inherit"
          disabled={isLoading}
          onClick={resetSteps}
          sx={{ mr: 1 }}
        >
          Start Again
        </Button>
        <Box sx={{ flex: "1 1 auto" }} />
        <Button
          disabled={!formik.isValid || isLoading}
          onClick={handleComplete}
          sx={{ mr: 1 }}
        >
          Complete
        </Button>
      </Box>
    </Box>
  );
};
