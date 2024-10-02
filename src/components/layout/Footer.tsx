import { Box, lighten } from "@mui/material";
import { Player } from "../player/Player";

export const Footer = () => {
  return (
    <Box
      // component="footer"
      color="primary"
      sx={(theme) => ({
        flexShrink: 0,
        background: lighten(theme.palette.background.paper, 0.2),
      })}
    >
      <Player />
    </Box>
  );
};
