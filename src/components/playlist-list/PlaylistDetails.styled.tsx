import { Box, Stack, alpha, styled } from "@mui/material";

interface IStyledBoxWithBgImageProps {
  url: string;
}

//  shouldForwardProp  https://github.com/mui/material-ui/issues/29207 https://mui.com/system/styled/#custom-components
export const StyledBoxWithBgImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== "url",
})<IStyledBoxWithBgImageProps>(({ url, theme }) => {
  const strongColor = alpha(theme.palette.background.default, 1);
  const weakColor = alpha(theme.palette.background.default, 0.7);

  return {
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `linear-gradient(${strongColor}, ${weakColor}, ${weakColor}, ${strongColor}), url(${url})`,
  };
});

export const StyledStackMenu = styled(Stack)(() => ({
  width: "100%",
  height: "25rem",
  backdropFilter: "blur(2px)",
  justifyContent: "space-evenly",
}));

// TODO https://mui.com/material-ui/customization/creating-themed-components/
export const StyledBoxShrankWithBgImage = styled(Box, {
  shouldForwardProp: (prop) => prop !== "url",
})<IStyledBoxWithBgImageProps>(({ url, theme }) => {
  const strongColor = alpha(theme.palette.background.default, 1);
  const weakColor = alpha(theme.palette.background.default, 0.7);

  return {
    position: "fixed",
    zIndex: theme.zIndex.mainFixedShrankMenu,
    width: "100%",
    backgroundRepeat: "no-repeat",
    backgroundSize: "cover",
    backgroundImage: `linear-gradient(${strongColor}, ${weakColor}, ${weakColor}, ${strongColor}), url(${url})`,
  };
});

export const StyledStackShrankMenu = styled(Stack)(() => ({
  backdropFilter: "blur(10px)",
  justifyContent: "space-evenly",
}));
