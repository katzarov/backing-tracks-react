import { darken, lighten, ThemeOptions } from "@mui/material";

// I wanted to code split the way they suggest here: https://mui.com/material-ui/customization/theming/#api

// let theme = createTheme(...)
// theme = createTheme(theme, {
//   components: {},
// });

// https://github.com/mui/material-ui/issues/42516 but it does not currently work, so we will do this for now.

// type ICreateThemeOptions = Parameters<typeof createTheme>[0];
export const components: ThemeOptions["components"] = {
  // MuiCssBaseline: {
  //   styleOverrides: btw, can also put the global styles here.
  // },
  MuiTypography: {
    variants: [
      {
        props: { variant: "linkSubtle" },
        style: {
          "& > a": {
            color: "unset",
            textDecoration: "unset",
          },
          "& > a:hover": {
            textDecoration: "underline",
          },
        },
      },
    ],
    defaultProps: {
      variantMapping: {
        // body1: "span",
      },
    },
  },
  MuiDialog: {
    defaultProps: {
      slotProps: {
        paper: {
          elevation: 0,
        },
      },
    },
  },
  MuiMenu: {
    defaultProps: {
      slotProps: {
        paper: {
          elevation: 16,
        },
      },
    },
  },
  MuiAppBar: {
    defaultProps: {
      enableColorOnDark: true,
    },
    styleOverrides: {
      root: ({ theme }) => ({
        // backgroundColor: theme.vars.palette.background.paper,
        backgroundColor: theme.palette.background.paper,
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

  // TOOD READ https://m2.material.io/design/environment/elevation.html

  MuiPaper: {
    defaultProps: {
      elevation: 0,
    },
    styleOverrides: {
      elevation: {
        backgroundImage: "none", // disables the linear gradient which changes the bg color too much for my liking
        // the important style that will differentaite the elevations will be just the box shadow, which we can also directly apply to where is necessary with sx={{ boxShadow: 10 }}
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
      root: ({ theme }) => ({
        padding: theme.spacing(4),
      }),
    },
  },
  MuiTextField: {
    defaultProps: {
      helperText: " ", // for consistent height - we can dynamically show and hide an error msg, which changes the height.
      variant: "standard",
      margin: "normal",
    },
    styleOverrides: {
      root: ({ theme }) => ({
        "& .MuiInputBase-input": {
          // marginTop: theme.spacing(2),
          // marginBottom: theme.spacing(1),
        },
      }),
    },
  },
  MuiInputLabel: {
    defaultProps: {
      disableAnimation: true,
      shrink: true,
    },
    styleOverrides: {
      root: {
        // transform: "none",
      },
      standard: ({ theme }) => ({
        // fontSize: theme.typography.pxToRem(14),
      }),
    },
  },
  MuiButtonBase: {
    defaultProps: {
      // "Without a ripple there is no styling for :focus-visible by default"
      // https://mui.com/material-ui/api/button-base/#props
      disableRipple: true,
    },
    styleOverrides: {
      root: {
        // padding: "1rem",
        // width: "fit-content",
        // height: "fit-content",
        "&.Mui-focusVisible": {
          // outline: "1px solid",

          // make this more generic.. and do this only to the large primary btn.
          outline: "2px solid var(--mui-palette-primary-main)",
          outlineOffset: "2px",
          // color: theme.vars.palette.primary.main,
        },
        // "&:hover": {
        //   color: "red",
        // },
      },

      // focusVisible styling selector broken ?
      // focusVisible: ({ theme }) => ({
      //   outline: "1px solid #556cd6",
      //   color: "red",
      //   // outline: `1px solid ${theme.vars.palette.primary.main}`,
      //   // color: theme.vars.palette.primary.main,
      // }),
    },
  },
  MuiButton: {
    defaultProps: {
      disableElevation: true,
    },
    styleOverrides: {
      contained: ({ theme }) => ({
        padding: theme.spacing(2, 4, 2, 4),
        // borderRadius: theme.typography.pxToRem(10),
      }),

      containedSizeLarge: ({ theme }) => ({
        borderRadius: theme.spacing(4),
        padding: theme.spacing(2, 10, 2, 10),
      }),

      // focusVisible: ({ theme }) => ({
      //   outline: "1px solid #556cd6",
      //   color: "red",
      //   // outline: `1px solid ${theme.vars.palette.primary.main}`,
      //   // color: theme.vars.palette.primary.main,
      // }),
      // outlinedPrimary
      // containedPrimary
      // outlinedSecondary
      // outlinedSizeLarge
      // textSizeLarge
      // etc

      // color: theme.palette.getContrastText(purple[500]),
      // backgroundColor: purple[500],
      // '&:hover': {
      //   backgroundColor: purple[700],
      // },

      text: {
        // maybe should move up here some styles as to not asscoiate them with JUST with the primary colors TODO break up textPrimary
      },
      colorPrimary: {},
      textPrimary: ({ theme }) => ({
        background: "none",
        color: theme.palette.getContrastText(theme.palette.background.default),
        transition: theme.transitions.create(["color"], {
          duration: theme.transitions.duration.shortest,
        }),
        "&:focus-visible": {
          outline: `1px dotted ${theme.palette.primary.main}`,
          outlineOffset: 0,
        },
        "&:hover": {
          // should just use the palete text color. TODO
          // this works but not the best i think...
          // "&": theme.applyStyles("light", {
          //   color: lighten(
          //     theme.palette.getContrastText(theme.palette.background.default),
          //     0.5
          //   ),
          // }),
          color:
            theme.palette.mode === "dark"
              ? darken(
                  theme.palette.getContrastText(
                    theme.palette.background.default
                  ),
                  0.25
                )
              : lighten(
                  theme.palette.getContrastText(
                    theme.palette.background.default
                  ),
                  0.5
                ),
        },
        "&:active": {
          // opacity: theme.palette.action.selectedOpacity
          // backgroundColor: alpha(
          //   theme.palette.primary.main,
          //   theme.palette.action.selectedOpacity
          // ),
          color:
            theme.palette.mode === "dark"
              ? darken(
                  theme.palette.getContrastText(
                    theme.palette.background.default
                  ),
                  0.7
                )
              : lighten(
                  theme.palette.getContrastText(
                    theme.palette.background.default
                  ),
                  0.7
                ),
        },
      }),

      // containedAccented: {},

      root: {
        // width: "fit-content",
        height: "fit-content",
        // display: "flex",
        // flexDirection: "column",
      },
    },
    // can also target it like this instead of containedAccented augmentatinon....
    variants: [
      {
        // https://mui.com/material-ui/customization/theme-components/?srsltid=AfmBOopNHr3uAs1Uw8uFV9s35bJDsDlgeV4-IRzDfBH8oO2h0ludGCU5#variants
        props: { variant: "contained", color: "accented", size: "large" },
        style: ({ theme }) => ({
          color: "red",
        }),
      },
      {
        props: { variant: "text", vertical: true },
        style: ({ theme }) => ({
          flexDirection: "column",
          "& .MuiButton-icon": {
            margin: 0,
            paddingBottom: theme.spacing(2),
          },
        }),
      },
    ],

    // just an example
    // styleOverrides: {
    //   disabled: ({ theme }) => ({
    //     color: theme.vars.palette.primary.main,
    //   }),
    // },
  },
  MuiIconButton: {
    defaultProps: {
      enableOutline: false,
      color: "primary",
    },
    styleOverrides: {
      colorPrimary: ({ theme }) => ({
        color: theme.palette.text.primary,
        ":hover": {
          color: darken(theme.palette.text.primary, 0.3),
        },
      }),
      colorSecondary: ({ theme }) => ({
        color: theme.palette.text.secondary,
        ":hover": {
          color: lighten(theme.palette.text.secondary, 0.5),
        },
      }),
      root: ({ theme }) => ({
        ":hover": {
          background: "none",
        },
      }),
    },
    variants: [
      {
        props: { enableOutline: true },
        style: ({ theme }) => ({
          backgroundColor: theme.palette.background.paper,
          border: "1px solid rgba(255, 255, 255, 0.1)",
          transition: theme.transitions.create(["color", "border-color"]),
          "&:hover": {
            backgroundColor: theme.palette.background.paper,
            borderColor: "rgba(255, 255, 255, 0.5)",
          },
        }),
      },
    ],
  },
  // MuiStepButton
  // MuiToggleButton
  // MuiList
  MuiListSubheader: {
    defaultProps: {
      disableSticky: true,
    },
    styleOverrides: {
      root: {
        textTransform: "uppercase",
        letterSpacing: "0.075rem",
      },
    },
  },
  MuiListItem: {
    defaultProps: {
      disablePadding: true,
    },
    styleOverrides: {
      root: {
        ":hover": {
          "& .MuiListItemSecondaryAction-root": {
            visibility: "visible",
          },
        },
        ":focus-within": {
          "& .MuiListItemSecondaryAction-root": {
            visibility: "visible",
          },
        },
      },
    },
  },
  MuiListItemSecondaryAction: {
    styleOverrides: {
      root: {
        // tab index not cool when user deselects the dropdown, focus is moved to beginning of document
        visibility: "hidden",
      },
    },
  },
  MuiListItemIcon: {
    styleOverrides: {
      root: ({ theme }) => ({
        color: theme.palette.text.secondary,
        ":hover": {
          // color: "red",
        },
      }),
    },
  },
  MuiListItemText: {
    defaultProps: {
      slotProps: {
        primary: {
          variant: "primary",
        },
        secondary: {
          variant: "secondary",
        },
      },
    },
    styleOverrides: {
      root: ({ theme }) => ({
        // fontWeight: 900,
        // color: theme.palette.text.primary,
        ":hover": {
          // color: "red",
        },
      }),
    },
  },
  MuiListItemButton: {
    defaultProps: {
      disableSelectedBackground: true,
    },
    styleOverrides: {
      // selected: {}, does not work..
      root: ({ theme }) => ({
        borderRadius: 10,
        transition: theme.transitions.create(["color", "background-color"], {
          duration: theme.transitions.duration.standard,
        }),
        "&.Mui-selected": {
          "& .MuiListItemText-root": {
            "& .MuiListItemText-primary": {
              color: theme.palette.primary.accent,
            },
          },

          "& .MuiSvgIcon-root": {
            fill: theme.palette.primary.accent,
          },
          // backgroundColor: this is the default calc for it
          //   "rgba(var(--mui-palette-primary-mainChannel) / var(--mui-palette-action-selectedOpacity))",
        },
      }),
    },
    variants: [
      {
        props: { disableSelectedBackground: true },
        style: {
          "&.Mui-selected": {
            background: "none",
          },
        },
      },
    ],
  },
};
