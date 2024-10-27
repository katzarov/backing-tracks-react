import { Box, lighten, keyframes } from "@mui/material";

const getWaveformKeyframes = (
  startColor: string,
  endColor: string
) => keyframes`
  0%, 100% {
    transform: scaleY(1);
    background-color: ${startColor};
  }
  50% {
    transform: scaleY(2);
    background-color: ${endColor};
  }
`;

const getRandomStartDelay = (index: number) => {
  const delay = Math.cos(index + 50);
  return `${delay}s`;
};

export const LoadingWaveform = () => {
  const bars = Array.from({ length: 30 });

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        // height: "100%",
      }}
    >
      {bars.map((_, i) => (
        <Box
          key={i}
          sx={(theme) => ({
            width: 10,
            height: 50,
            margin: "0 3px",
            backgroundColor: theme.palette.primary.main,
            animation: `${getWaveformKeyframes(
              theme.palette.primary.main,
              lighten(theme.palette.primary.main, 0.45)
            )} 0.75s ease-in-out infinite`,
            animationDelay: getRandomStartDelay(i),
          })}
        />
      ))}
    </Box>
  );
};
