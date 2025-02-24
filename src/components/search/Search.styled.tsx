import { styled, InputBase } from "@mui/material";

export const SearchInput = styled("div")(({ theme }) => ({
  position: "relative",
  // height: "100%",
  borderRadius: 10,
  color: theme.palette.text.secondary,
  backgroundColor: theme.palette.background.paper,
  border: "1px solid rgba(255, 255, 255, 0.1)",
  transition: theme.transitions.create(["color", "border-color"]),
  "&:hover": {
    color: theme.palette.text.primary,
    borderColor: "rgba(255, 255, 255, 0.5)",
  },
  marginLeft: 0,
  width: "100%",
  [theme.breakpoints.up("sm")]: {
    marginLeft: theme.spacing(1),
    width: "auto",
  },
}));

export const SearchIconWrapper = styled("div")(({ theme }) => ({
  padding: theme.spacing(0, 2),
  height: "100%",
  position: "absolute",
  pointerEvents: "none",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  width: "100%",
  height: "100%",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(6)})`,
    transition: theme.transitions.create("width"),
    [theme.breakpoints.up("sm")]: {
      width: "12ch",
      "&:focus": {
        width: "24ch",
      },
    },
  },
}));
