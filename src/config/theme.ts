import { PaletteMode } from "@mui/material";
import {
  createTheme,
  responsiveFontSizes,
  ThemeOptions,
} from "@mui/material/styles";
import { darkModeTokens, lightModeTokens } from "./design-tokens";

const getTheme = (mode: PaletteMode): ThemeOptions => ({
  palette: {
    mode,
    ...(mode === "light" ? lightModeTokens : darkModeTokens),
  },
  components: {
    MuiPaper: {
      styleOverrides: {
        root: {
          // border: "10px solid red",
        },
      },
    },
    MuiDrawer: {
      styleOverrides: {
        paper: {
          borderColor: "black",
        },
      },
    },
    MuiDivider: {
      styleOverrides: {
        root: {
          backgroundColor: "black",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
      },
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
      },
    },
    MuiListItem: {
      defaultProps: {
        disablePadding: true,
      },
    },
    MuiListItemButton: {
      styleOverrides: {
        root: {
          borderRadius: 10,
        },
      },
    },
  },

  shape: {
    // borderRadius:
  },
  transitions: {
    create: () => "none",
  },
});

const initTheme = createTheme(getTheme("dark"));
export const theme = responsiveFontSizes(initTheme);
