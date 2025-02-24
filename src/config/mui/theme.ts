import { createTheme } from "@mui/material/styles";
import { components } from "./components";

const baseTheme = createTheme({
  // https://mui.com/material-ui/customization/css-theme-variables/configuration/#toggling-dark-mode-manually
  // cssVariables: {
  //   colorSchemeSelector: "data",
  // },
  cssVariables: true,
  colorSchemes: {
    light: {
      palette: {
        common: {
          accent: "rgb(125, 0, 0)",
        },
        primary: {
          main: "#19857b",
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
        // text ?
        // need to do the types for extra vars here https://mui.com/material-ui/customization/css-theme-variables/usage/#typescript
        common: {
          accent: "rgb(52, 255, 239)",
        },
        action: {
          // hoverOpacity todo
          // activatedOpacity,

          selectedOpacity: 0.1,
          // focus: "red",
          // active: "orange",
        },
        // error, warning etc colors TODO
        divider: "rgb(36, 36, 41)",
        text: {
          // These will be used for everything but the buttons in contained variant, I believe. Make sure these have enough contrast against the background/paper.
          primary: "rgb(255, 255, 255)",
          secondary: "rgb(167, 167, 169)",
          // disabled
        },
        primary: {
          // accent: rgbToHex("rgb(255, 212, 49)"),

          main: "rgb(255, 255, 255)",
          // ContrastText used only for the buttons in "containted" variant I believe.. Make sure enough contrast against the main color.
          // contrastText ? maybe do that here and not in the btns themselves

          // dark:
          // light
        },
        secondary: {
          main: "rgb(36, 36, 41)",
          light: "rgb(120, 120, 135)",
          // contrastText ? maybe do that here and not in the btns themselves
        },
        background: {
          default: "rgb(0, 0, 0)",
          paper: "rgb(36, 36, 41)",
        },

        // AppBar: {
        //   darkBg: "#121212",
        // },
      },
    },
  },


  // TODO: wait... do I actually need to call theme.spacing myself ? or it is going to be used if i just pass a number here like: py: 0.5
  spacing: (factor: number) => `${0.25 * factor}rem`, // TODO: maybe USE for margins and paddings, so for 'spacing' and for the rest: width, height eg use rem directly...
  shape: {
    borderRadius: 5,
  },
  // todo explore rest of config obj
  transitions: {
    // easing: {easeIn}
    duration: {
      // standard: 150,
      enteringScreen: 100,
    },
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
    // TODO https://mui.com/material-ui/customization/typography/#adding-amp-disabling-variants
    fontFamily: "Nationale, sans-serif",
    allVariants: {
      // overrides all variants
      // some MUI components work with body1, body2, subtitle and etc, variants, instead of redefinig those, we just override all variants and will later use your own variants and will need to specify them.
      color: "var(--mui-palette-text-primary)",
      // fontSize: "0.875rem",
      fontWeight: 500,
    },
    button: {
      textTransform: "none",
      fontWeight: 600,
    },
    h2: {
      fontWeight: 600,
    },
    h3: {},
    primary: {
      color: "var(--mui-palette-text-primary)",
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    primaryBold: {
      color: "var(--mui-palette-text-primary)",
      fontSize: "0.875rem",
      fontWeight: 600,
    },
    secondary: {
      color: "var(--mui-palette-text-secondary)",
      fontSize: "0.875rem",
      fontWeight: 500,
    },
    secondaryBold: {
      color: "var(--mui-palette-text-secondary)",
      fontSize: "0.875rem",
      fontWeight: 600,
    },
    linkSubtle: {
      fontSize: "0.625rem",
      fontWeight: 600,
      letterSpacing: "0.075rem",
      color: "var(--mui-palette-text-secondary)",
      textTransform: "uppercase",
    },
    // body => span and not p !!!! todod
  },
  components,
});

// export const theme = responsiveFontSizes(baseTheme); // responsiveFontSizes() seems to not work ? https://github.com/mui/material-ui/issues/44380 actyally looks like i wont be using it anyway

export const theme = baseTheme;
