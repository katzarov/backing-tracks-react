import Box from "@mui/material/Box";
import { useDrawer } from "src/hooks/useDrawer";
import { Header } from "src/components/layout/Header";
import { Footer } from "src/components/layout/Footer";
import { Drawer } from "src/components/layout/Drawer";
import { Outlet } from "react-router-dom";
import { useTrackSelector } from "src/hooks/useTrackSelector";

export const MainApp = () => {
  useTrackSelector();

  const { mobileDrawerOpen, handleDrawerToggle, handleDrawerClose } =
    useDrawer();

  return (
    <Box sx={{ display: "flex", flexDirection: "column", height: "100vh" }}>
      <Header handleDrawerToggle={handleDrawerToggle} />
      <Box
        sx={{
          display: "flex",
          flexGrow: 1,
          overflowY: "hidden",
          bgcolor: "background.paper",
        }}
      >
        <Drawer
          mobileDrawerOpen={mobileDrawerOpen}
          handleDrawerToggle={handleDrawerToggle}
          handleDrawerClose={handleDrawerClose}
        />
        <Box component="main" sx={{ flexGrow: 1, overflowY: "auto" }}>
          <Outlet />
        </Box>
      </Box>
      <Footer />
    </Box>
  );
};
