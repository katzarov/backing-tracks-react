import { Tooltip } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import {
  SearchInput,
  SearchIconWrapper,
  StyledInputBase,
} from "./Search.styled";

export const Search = () => {
  return (
    <Tooltip arrow placement="bottom-start" title="Not implemented yet!">
      <SearchInput>
        <SearchIconWrapper>
          <SearchIcon fontSize="small" />
        </SearchIconWrapper>
        <StyledInputBase
          placeholder="Search…"
          inputProps={{ "aria-label": "search" }}
        />
      </SearchInput>
    </Tooltip>
  );
};
