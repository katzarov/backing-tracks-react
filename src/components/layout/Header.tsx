import { Box, IconButton, MenuItem, Toolbar, Typography } from "@mui/material";
import { AppLogo } from "../shared/AppLogo";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import LogoutIcon from "@mui/icons-material/Logout";
import { useAppSelector } from "@src/store";
import { selectUserData } from "@src/store/slices/auth";
import { PopoverMenu } from "../shared/PopoverMenu";
import { usePopover } from "@src/hooks/usePopover";
import { authClient } from "@src/lib/auth";
import { routes } from "@src/routes/routes";

export const Header = () => {
  const { name } = useAppSelector(selectUserData);
  const {
    popoverAnchorElement,
    shoulOpenPopover,
    handleOpenPopover,
    handleClosePopover,
  } = usePopover();

  // dont preserve the url in this user initiated case, but TODO preserve the query params when being logged out by the HOC(getSilentToken failing to) and then restore user where they were
  const logoutWithRedirect = async () =>
    await authClient.logoutWithRedirect(
      `${window.location.origin}${routes.logoutUserInitiated}`
    );

  return (
    <Box component="header">
      <Toolbar sx={{ paddingRight: 1 }}>
        <AppLogo sx={{ mr: "auto", width: "3rem", height: "3rem" }} />
        <Typography noWrap variant="secondaryBold">
          {name}
        </Typography>
        <IconButton
          aria-label="close-dialog"
          color="secondary"
          size="small"
          onClick={handleOpenPopover}
        >
          <MoreHorizIcon />
        </IconButton>
        <PopoverMenu
          id="profile-menu-button"
          MenuListProps={{
            "aria-labelledby": "profile-action-buttons",
          }}
          anchorEl={popoverAnchorElement}
          open={shoulOpenPopover}
          onClose={handleClosePopover}
        >
          <MenuItem onClick={logoutWithRedirect}>
            <LogoutIcon />
            Logout
          </MenuItem>
        </PopoverMenu>
      </Toolbar>
    </Box>
  );
};
