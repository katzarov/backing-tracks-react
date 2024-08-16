import { Box } from "@mui/material";
import { LoadingWaveform } from "./LoadingWaveform";
import { FC } from "react";

interface ILoadingPageProps {
  message: string;
}

export const LoadingPage: FC<ILoadingPageProps> = ({ message }) => {
  // const wavefromHeight = { TODO };
  // then calc text margin based on that
  return (
    <Box
      sx={{
        height: "100vh",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
      }}
    >
      <LoadingWaveform />
      <Box mt={5}>{message}</Box>
    </Box>
  );
};
