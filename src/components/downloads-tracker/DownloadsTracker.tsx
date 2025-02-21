import { Badge, Box, IconButton, List, Popover } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import { usePopover } from "@src/hooks/usePopover";
import { useListenToNotificationsQueryState } from "@src/store/api/notifications";
import { DownloadsListItem } from "./DownloadsListItem";

export const DownloadsTracker = () => {
  const {
    shoulOpenPopover,
    popoverAnchorElement,
    handleOpenPopover,
    handleClosePopover,
  } = usePopover();

  const { YtdlState } = useListenToNotificationsQueryState(undefined, {
    selectFromResult: ({ data }) => {
      return { YtdlState: data?.ytdl };
    },
  });

  const downloadsCount =
    (YtdlState?.count.active || 0) + (YtdlState?.count.waiting || 0);

  return (
    <>
      <IconButton
        size="medium"
        aria-label={`shows ${downloadsCount} current downloads`}
        onClick={handleOpenPopover}
      >
        {/* TODO color error when a failed job and dislay the failed count. When no err, show current downloads */}
        <Badge badgeContent={downloadsCount} color="success">
          <DownloadIcon />
        </Badge>
      </IconButton>
      <Popover
        open={shoulOpenPopover}
        anchorEl={popoverAnchorElement}
        onClose={handleClosePopover}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
      >
        <Box
          sx={(theme) => ({
            width: "30rem",
            height: "20rem",
            p: theme.spacing(4),
          })}
        >
          <List dense>
            {YtdlState?.jobs.map((job) => (
              <DownloadsListItem key={job.id} job={job} />
            ))}
          </List>
        </Box>
      </Popover>
    </>
  );
};
