import { Paper } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const Drawer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Paper
      component="nav"
      elevation={10}
      sx={(theme) => ({
        width: "100%",
        maxWidth: "15rem",
        overflowY: "auto",
        p: theme.spacing(2),
      })}
    >
      {children}
    </Paper>
  );
};
