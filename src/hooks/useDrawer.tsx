import { useState } from "react";

// TODO: close mobile drawer on any window size changes
export const useDrawer = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const handleDrawerClose = () => {
    setMobileDrawerOpen(false);
  };

  const handleDrawerToggle = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  return {
    mobileDrawerOpen,
    handleDrawerClose,
    handleDrawerToggle,
  };
};
