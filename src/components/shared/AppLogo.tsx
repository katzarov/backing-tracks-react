import { Avatar, SxProps, Theme } from "@mui/material";
import logo_transparent from "../../assets/logo_transparent.png";
import { FC } from "react";

interface IAppLogoProps {
  sx?: SxProps<Theme>;
}

export const AppLogo: FC<IAppLogoProps> = ({ sx }) => {
  return (
    <Avatar
      alt="App logo"
      src={logo_transparent}
      variant="square"
      sx={{ width: 60, height: 60, ...sx }}
    />
  );
};
