import {
  createTheme,
  responsiveFontSizes,
  Theme,
  darken,
} from "@mui/material/styles";
import { NormalCssProperties } from "@mui/material/styles/createMixins"; // import type * as CSS from "csstype"; might want to get them directly from the lib
import { Font_Face_Nationale } from "./fonts.mui";

// https://mui.com/material-ui/customization/theming/#typescript
declare module "@mui/material/styles" {
  interface ZIndex {
    footerWaveformOverlays: number;
    mainFixedShrankMenu: number;
    mainFixedUI: number;
  }
}

// https://github.com/mui/material-ui/issues/40225
// https://github.com/mui/material-ui/issues/38137
const baseTheme = createTheme({
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#556cd6",
        },
        secondary: {
          main: "#19857b",
        },
        background: {
          default: "#f6f2e6",
          paper: "#f6f2e6",
        },
      },
    },
    dark: {
      palette: {
        primary: {
          main: "#556cd6",
        },
        secondary: {
          main: "#19857b",
        },
        background: {
          default: "#121212",
          paper: "#121212",
        },
      },
    },
  },
  components: {
    MuiAppBar: {
      defaultProps: {
        enableColorOnDark: true,
      },
      styleOverrides: {
        root: ({ theme }) => ({
          backgroundColor: theme.vars.palette.background.paper,
          backgroundImage: "none",
          boxShadow: "none",
        }),
      },
    },
    MuiToolbar: {
      defaultProps: {
        disableGutters: true,
      },
    },
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
    // TODO make all transitions a bit faster than default
  },
  zIndex: {
    // default mui z-index values redefined here for visibility, + our custom ones.
    footerWaveformOverlays: 100,
    mainFixedShrankMenu: 300,
    mainFixedUI: 600,
    mobileStepper: 1000,
    fab: 1050,
    speedDial: 1050,
    appBar: 1100,
    drawer: 1200,
    modal: 1300,
    snackbar: 1400,
    tooltip: 1500,
  },
  typography: {
    fontFamily: "'Nationale', sans-serif",
  },
});

export const theme = responsiveFontSizes(baseTheme);

export const globalStyles = (theme: Theme) => [
  ...Font_Face_Nationale,
  {
    "::-webkit-scrollbar": {
      width: "8px", // width of the scrollbar
      height: "8px", // height of the scrollbar (for horizontal scrollbars)
    },
    "::-webkit-scrollbar-thumb": {
      backgroundColor: theme.palette.primary.main,
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: darken(theme.palette.primary.main, 0.2),
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.background.paper,
    },
  } satisfies Record<string, NormalCssProperties>,
];
