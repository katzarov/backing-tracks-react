import { Box } from "@mui/material";
import { Search } from "../search/Search";
import { DownloadsTracker } from "../downloads-tracker/DownloadsTracker";

/**
 * Holds various position:fixed UI elements, namely: Search and DownloadsTracker.
 * They should appear fixed at top right within the main/outlet component.
 **/
export const FixedUIElements = () => {
  return (
    <Box
      sx={(theme) => ({
        position: "fixed",
        display: "flex",
        flexDirection: "row",
        right: 0,
        marginRight: 2,
        zIndex: theme.zIndex.mainFixedUI,
      })}
    >
      <Search />
      <DownloadsTracker />
    </Box>
  );
};
