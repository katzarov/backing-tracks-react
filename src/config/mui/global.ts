import { Theme, darken } from "@mui/material/styles";

import { NormalCssProperties } from "@mui/material/styles/createMixins"; // import type * as CSS from "csstype"; might want to get them directly from the lib
import { Font_Face_Nationale } from "./fonts";

export const globalStyles = (theme: Theme) => [
  ...Font_Face_Nationale,
  // TODO for all browsers do the scrollbar...
  {
    "::-webkit-scrollbar": {
      width: "8px", // width of the scrollbar
      height: "8px", // height of the scrollbar (for horizontal scrollbars)
    },
    "::-webkit-scrollbar-thumb": {
      // can also just use the css var ... var(--mui-whateveritscalled)
      backgroundColor: theme.palette.secondary.light,
      borderRadius: "10px",
    },
    "::-webkit-scrollbar-thumb:hover": {
      backgroundColor: darken(theme.palette.secondary.light, 0.2),
    },
    "::-webkit-scrollbar-track": {
      backgroundColor: theme.palette.background.paper,
    },
  } satisfies Record<string, NormalCssProperties>,
  {
    ":root": {
      "--fixed-ui-spacing": "4rem",
    },
  },
];
