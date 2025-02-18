import { Paper } from "@mui/material";
import { PlayerContainer } from "../player/PlayerContainer";

export const Footer = () => {
  return (
    <Paper
      component="footer"
      elevation={10}
      sx={(theme) => ({
        p: theme.spacing(4),
      })}
    >
      <PlayerContainer />
    </Paper>
  );
};
