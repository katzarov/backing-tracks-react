import { Fontface } from "@mui/material/styles/createMixins"; // import type * as CSS from "csstype"; might want to get them directly from the lib

import NationaleLight from "../../assets/fonts/Nationale-Light.otf";
import NationaleRegular from "../../assets/fonts/Nationale-Regular.otf";
import NationaleMedium from "../../assets/fonts/Nationale-Medium.otf";
import NationaleDemiBold from "../../assets/fonts/Nationale-DemiBold.otf";
import NationaleBold from "../../assets/fonts/Nationale-Bold.otf";
import NationaleBlack from "../../assets/fonts/Nationale-Black.otf";
import NationaleItalic from "../../assets/fonts/Nationale-Italic.otf";

// https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face/font-weight#common_weight_name_mapping

export const Font_Face_Nationale: Array<Record<"@font-face", Fontface>> = [
  {
    "@font-face": {
      fontFamily: "Nationale",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: "100 300",
      src: `url(${NationaleLight}) format('opentype')`,
      // src: `local('Nationale'), local('Nationale-Regular'), url(${NationaleRegular}) format('opentype')`,
      // tech ? TODO local and tech https://developer.mozilla.org/en-US/docs/Web/CSS/@font-face
    },
  },
  {
    "@font-face": {
      fontFamily: "Nationale",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: 400,
      src: `url(${NationaleRegular}) format('opentype')`,
    },
  },
  {
    "@font-face": {
      fontFamily: "Nationale",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: 500,
      src: `url(${NationaleMedium}) format('opentype')`,
    },
  },
  {
    "@font-face": {
      fontFamily: "Nationale",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: 600,
      src: `url(${NationaleDemiBold}) format('opentype')`,
    },
  },
  {
    "@font-face": {
      fontFamily: "Nationale",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: "700 800",
      src: `url(${NationaleBold}) format('opentype')`,
    },
  },
  {
    "@font-face": {
      fontFamily: "Nationale",
      fontStyle: "normal",
      fontDisplay: "swap",
      fontWeight: 900,
      src: `url(${NationaleBlack}) format('opentype')`,
    },
  },
  {
    "@font-face": {
      fontFamily: "Nationale",
      fontStyle: "italic",
      fontDisplay: "swap",
      src: `url(${NationaleItalic}) format('opentype')`,
    },
  },
];
