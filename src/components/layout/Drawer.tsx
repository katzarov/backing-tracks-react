import { FC } from "react";
import { Box, Drawer as MuiDrawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { DrawerContents } from "src/components/shared/DrawerContents";

interface IDrawerProps {
  mobileDrawerOpen: boolean;
  handleDrawerToggle: () => void;
  handleDrawerClose: () => void;
}

export const Drawer: FC<IDrawerProps> = ({
  mobileDrawerOpen,
  handleDrawerToggle,
  handleDrawerClose,
}) => {
  return (
    <Box
      component="nav"
      sx={{
        width: "100%",
        maxWidth: "15rem",
        overflowY: "auto",
        display: { xs: "none", sm: "block" },
      }}
      // sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
    >
      <DrawerContents />

      <MuiDrawer
        variant="temporary"
        open={mobileDrawerOpen}
        onClose={handleDrawerClose}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          display: { xs: "block", sm: "none" },
          "& .MuiDrawer-paper": {
            boxSizing: "border-box",
            width: "80%",
          },
        }}
      >
        <IconButton
          // color="inherit"
          aria-label="close drawer"
          // edge="start"
          onClick={handleDrawerToggle}
          sx={{ display: { sm: "none" } }}
        >
          <CloseIcon />
        </IconButton>
        <DrawerContents />
      </MuiDrawer>
    </Box>
  );
};
