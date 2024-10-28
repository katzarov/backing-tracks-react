import { Box } from "@mui/material";
import { FC, PropsWithChildren } from "react";

export const Drawer: FC<PropsWithChildren> = ({ children }) => {
  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        maxWidth: "15rem",
        overflowY: "auto",
      }}
    >
      {children}
    </Box>
  );
};
