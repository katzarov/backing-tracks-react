// https://mui.com/material-ui/customization/theming/#typescript
// https://mui.com/material-ui/customization/theming/?srsltid=AfmBOoprMc0lf6MqYvoe1zwTfQZOVOUhkVcxKjNWyxvrtoDiESxGkeMN#api

// https://www.typescriptlang.org/docs/handbook/declaration-merging.html#module-augmentation

declare module "@mui/material/styles" {
  interface ZIndex {
    footerWaveformOverlays: number;
    mainFixedShrankMenu: number;
    mainFixedUI: number;
  }

  // new color for existing palette - adds to primary, secondary, etc.
  // https://mui.com/material-ui/customization/palette/#adding-color-tokens
  interface PaletteColor {
    accent?: string;
  }

  interface SimplePaletteColorOptions {
    accent?: string;
  }

  // a WHOLE NEW pallete having the same props as the existing primary palette
  // https://mui.com/material-ui/customization/palette/#custom-colors
  interface Palette {
    accented: Palette["primary"];
  }

  interface PaletteOptions {
    accented?: PaletteOptions["primary"];
  }

  interface TypographyVariants {
    linkSubtle: React.CSSProperties;
    primary: React.CSSProperties;
    primaryBold: React.CSSProperties;
    secondary: React.CSSProperties;
    secondaryBold: React.CSSProperties;
  }

  // allow configuration using `createTheme()`
  interface TypographyVariantsOptions {
    linkSubtle?: React.CSSProperties;
    primary?: React.CSSProperties;
    primaryBold?: React.CSSProperties;
    secondary?: React.CSSProperties;
    secondaryBold?: React.CSSProperties;
  }
}

declare module "@mui/material/Typography" {
  interface TypographyPropsVariantOverrides {
    linkSubtle: true;
    primary: true;
    primaryBold: true;
    secondary: true;
    secondaryBold: true;
    // TODO disable most of the default ones
    // h3: false;
  }
}

declare module "@mui/material/Button" {
  // add new palette to button <Button color="accented" />
  interface ButtonPropsColorOverrides {
    accented: true;
  }

  // https://mui.com/material-ui/customization/theme-components/#theme-style-overrides
  interface ButtonPropsVariantOverrides {
    textVertical: true; // todo ??? and then do it with variants: []
    // nah adding a simple prop is better... like below is easier

    // do the same for accented color ?
  }

  // interface ButtonPropsSizeOverrides {}

  // I can define this... and then style like so: MuiButton: { styleOverrides: { containedAccented: {}, outlinedAccented: {}, etc.. }}
  // but I am not sure if MUI expects this interface to be augmented.. so I will use the MuiButton: {variants: [{}]} to define my custom variant.
  // interface ButtonClasses {
  //   containedAccented: true;
  //   outlinedAccented: true;
  //   textAccented: true;
  // }

  interface ButtonOwnProps {
    vertical?: true; // todo fix react runtime err cause the prop is forwared.. I can fix it by making a styled comp and there disabling the forwarding of this prop...
    // same for selected ? heart button
    // same for accented ?
  }
}

declare module "@mui/material/ListItemButton" {
  // ListItemButtonBaseProps, ListItemButtonOwnProps ... ListItemButtonProps ??
  interface ListItemButtonOwnProps {
    disableSelectedBackground?: boolean; // todo fix react runtime err
  }
}

declare module "@mui/material/IconButton" {
  interface IconButtonOwnProps {
    enableOutline?: boolean; // todo fix react runtime err
  }
}

// without an import or an export in the file.. this file is considered an "Ambient module" and that does not work for some reason.
// https://github.com/mui/material-ui/issues/28244, https://github.com/mui/material-ui/blob/master/packages/mui-lab/src/themeAugmentation/overrides.ts
export {};

// maybe we should prefix our custom props
