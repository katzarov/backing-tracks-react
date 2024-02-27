import { experimental_extendTheme as extendTheme } from "@mui/material/styles";

// remaining issues until stable
// https://github.com/mui/material-ui/issues/40225
// https://github.com/mui/material-ui/issues/38137
export const theme = extendTheme({
  colorSchemes: {
    light: {
      palette: {
        primary: {
          main: "#556cd6",
        },
        secondary: {
          main: "#19857b",
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
      },
    },
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
  // apparently typography doestn't work
});

// https://github.com/mui/material-ui/issues/40516
// TODO: responsiveFontSizes(); feat seems to still work, so it might be only that there is a type issue, but I can just wait for now.
