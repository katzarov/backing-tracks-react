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
        gap: 4,
        right: 0,
        marginTop: 4,
        marginRight: 4,
        zIndex: theme.zIndex.mainFixedUI,
      })}
    >
      <Search />
      <DownloadsTracker />
    </Box>
  );
};
