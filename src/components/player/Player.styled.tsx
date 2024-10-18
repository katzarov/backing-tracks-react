import { styled, Box } from "@mui/material";

export const StyledLoadingOverlay = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: 1000,
  opacity: 0.3,
  backgroundColor: theme.palette.primary.main,
}));

export const StyledLoadingOverlayMessage = styled(Box)({
  position: "absolute",
  top: 20,
  left: 0,
  width: "100%",
  zIndex: 1000,
  textAlign: "center",
  // pointerEvents: 'none',
  userSelect: "none",
});
