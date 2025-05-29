import { styled, Box, LinearProgress, darken, alpha } from "@mui/material";
import { NormalCssProperties } from "@mui/material/styles/createMixins";
import { regionPartTokens } from "@src/lib/wavesurfer-react";

export const StyledLoadingOverlay = styled(LinearProgress)(({ theme }) => ({
  position: "absolute",
  top: 0,
  left: 0,
  width: "100%",
  height: "100%",
  zIndex: theme.zIndex.footerWaveformOverlays,
  opacity: 0.3,
}));

export const StyledLoadingOverlayMessage = styled(Box)(({ theme }) => ({
  position: "absolute",
  top: 20,
  left: 0,
  width: "100%",
  zIndex: theme.zIndex.footerWaveformOverlays,
  textAlign: "center",
  // pointerEvents: 'none',
  userSelect: "none",
}));

export const StyledWaveSurfer = styled(Box)(({ theme }) => ({
  flexGrow: 1,
  height: "8rem",

  // https://wavesurfer.xyz/docs/#md:css-styling
  // https://wavesurfer.xyz/examples/?styling.js
  ...({
    "& ::part(canvases)": {
      cursor: "crosshair",
    },

    "& ::part(progress)": {
      cursor: "crosshair",
      pointerEvents: "auto",
    },

    "& ::part(region)": {
      height: "50%",
      bottom: 0,
      top: "unset",
      cursor: "pointer",
      backgroundColor: alpha(darken(theme.palette.common.accent, 0.7), 0.8),
      borderRadius: theme.shape.borderRadius,

      "&:hover": {
        backgroundColor: alpha(darken(theme.palette.common.accent, 0.6), 0.8),
      },
    },

    [`& ::part(region ${regionPartTokens.editable})`]: {
      cursor: "grab",
    },

    [`& ::part(region ${regionPartTokens.selected})`]: {
      backgroundColor: alpha(darken(theme.palette.common.accent, 0.5), 0.8),

      "&:hover": {
        backgroundColor: alpha(darken(theme.palette.common.accent, 0.5), 0.8),
      },
    },

    [`& ::part(region ${regionPartTokens.selected} ${regionPartTokens.editable})`]:
      {},

    "& ::part(region-handle)": {
      borderRadius: theme.shape.borderRadius,
    },

    "& ::part(region-content)": {
      // overflow: "hidden",
      // display: "block",
      // textOverflow: "ellipsis",
      // whiteSpace: "nowrap",
      // good but the above is messing with the overlap ?
      // height: "50%", ?
    },
  } satisfies Record<string, NormalCssProperties>),
}));

