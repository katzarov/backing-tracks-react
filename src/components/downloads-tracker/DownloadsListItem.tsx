import {
  Avatar,
  LinearProgress,
  ListItem,
  ListItemAvatar,
  ListItemText,
} from "@mui/material";
import { YtdlJobFormatted } from "@src/store/api/notifications";
import { FC } from "react";

interface IDownloadsListItemProps {
  job: YtdlJobFormatted;
}

export const DownloadsListItem: FC<IDownloadsListItemProps> = ({ job }) => {
  const jobProgress =
    typeof job.progress === "object"
      ? { percent: parseInt(job.progress.percent), eta: job.progress.eta }
      : { percent: 0, eta: null };

  const getStatusDetailsComp = () => {
    if (job.state === "active") {
      return (
        <LinearProgress
          sx={{ width: "10rem" }}
          variant="determinate"
          value={jobProgress.percent!}
        />
      );
    }
    if (job.state === "completed" || job.state === "failed") {
      const localTime = new Date(job.finishedOn).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return <ListItemText secondary={localTime} sx={{ width: "10rem" }} />;
    }
  };

  // TODO: use grid2
  return (
    <ListItem
      sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
    >
      <ListItemAvatar>
        <Avatar
          variant="square"
          src={job.data.meta.spotify.albumArt.small?.url}
        />
      </ListItemAvatar>
      <ListItemText
        primary={job.data.meta.spotify.trackName}
        secondary={job.data.meta.spotify.artistName}
        sx={{ width: "10rem" }}
      />
      <ListItemText secondary={job.state} sx={{ width: "10rem" }} />

      {getStatusDetailsComp()}

      {/* TODO: link to all-tracks */}
    </ListItem>
  );
};
