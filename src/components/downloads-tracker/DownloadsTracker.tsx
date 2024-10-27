import { Badge, IconButton, Tooltip } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";

export const DownloadsTracker = () => {
  return (
    <Tooltip arrow placement="bottom-start" title="Not implemented yet!">
      <IconButton
        size="medium"
        aria-label="show 2 active downloads"
        color="inherit"
      >
        <Badge badgeContent={2} color="error">
          <DownloadIcon />
        </Badge>
      </IconButton>
    </Tooltip>
  );
};
