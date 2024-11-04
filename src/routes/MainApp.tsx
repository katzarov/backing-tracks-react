import Box from "@mui/material/Box";
import { useDrawer } from "src/hooks/useDrawer";
import { HeaderMobile } from "@src/components/layout/Header.mobile";
import { Footer } from "src/components/layout/Footer";
import { Drawer } from "src/components/layout/Drawer";
import { Outlet } from "react-router-dom";
import { Theme, useMediaQuery } from "@mui/material";
import { FixedUIElements } from "@src/components/layout/FixedUIElements";
import { DrawerMobile } from "@src/components/layout/Drawer.mobile";
import { DrawerContents } from "@src/components/shared/DrawerContents";
import { Header } from "@src/components/layout/Header";

export const MainApp = () => {
  const { mobileDrawerOpen, handleDrawerToggle, handleDrawerClose } =
    useDrawer();

  const isXsScreen = useMediaQuery<Theme>((theme) =>
    theme.breakpoints.only("xs")
  );

  // TODO: One time warning - warn user that app is best used and fully featured only on desktop.
  // Also check for browser min version, and dont even load the js bundle?
  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      {isXsScreen && (
        <>
          <HeaderMobile handleDrawerToggle={handleDrawerToggle} />
          <DrawerMobile
            mobileDrawerOpen={mobileDrawerOpen}
            handleDrawerClose={handleDrawerClose}
          >
            <DrawerContents />
          </DrawerMobile>
        </>
      )}
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          flexGrow: 1,
          overflowY: "hidden",
        }}
      >
        {!isXsScreen && (
          <Drawer>
            <Header />
            <DrawerContents />
          </Drawer>
        )}
        <Box component="main" sx={{ flexGrow: 1, overflowY: "auto" }}>
          {!isXsScreen && <FixedUIElements />}
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
