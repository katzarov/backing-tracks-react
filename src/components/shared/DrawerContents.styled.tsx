import { List, styled } from "@mui/material";

export const StyledList = styled(List)(({ theme }) => ({
  "& .MuiListItemButton-root": {
    paddingTop: theme.spacing(1),
    paddingBottom: theme.spacing(1),

    "& .MuiListItemIcon-root": {
      minWidth: 0,
      marginRight: theme.spacing(4),
    },
  },
}));
