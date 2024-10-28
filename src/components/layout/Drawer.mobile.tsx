import { FC, PropsWithChildren } from "react";
import { Box, Drawer, IconButton } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { AppLogo } from "../shared/AppLogo";

interface IDrawerMobileProps extends PropsWithChildren {
  mobileDrawerOpen: boolean;
  handleDrawerClose: () => void;
}

export const DrawerMobile: FC<IDrawerMobileProps> = ({
  children,
  mobileDrawerOpen,
  handleDrawerClose,
}) => {
  return (
    <Drawer
      anchor="left"
      variant="temporary"
      open={mobileDrawerOpen}
      onClose={handleDrawerClose}
      onClick={handleDrawerClose}
      ModalProps={{
        keepMounted: true,
      }}
      PaperProps={{
        sx: {
          width: "80%",
        },
      }}
    >
      <Box sx={{ display: "flex", mx: 2 }}>
        <IconButton
          aria-label="close drawer"
          edge="start"
          onClick={handleDrawerClose}
          sx={{ alignSelf: "center" }}
        >
          <CloseIcon />
        </IconButton>
        <AppLogo />
      </Box>
      {children}
    </Drawer>
  );
};
