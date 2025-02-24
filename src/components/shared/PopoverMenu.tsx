import { styled } from "@mui/material/styles";
import Menu, { MenuProps } from "@mui/material/Menu";

export const PopoverMenu = styled((props: MenuProps) => {
  return <Menu {...props} />;
})(({ theme }) => ({
  "& .MuiPaper-root": {
    // TODO use for offseting the popover menu. Get the rendered height of the anchorEl and use that
    // marginTop:
    // maringLeft

    "& .MuiMenu-list": {
      padding: theme.spacing(1, 0),
    },
    "& .MuiMenuItem-root": {
      fontSize: theme.typography.pxToRem(12),
      fontWeight: 600,
      "& .MuiSvgIcon-root": {
        fontSize: theme.typography.pxToRem(16),
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
    },
  },
}));
