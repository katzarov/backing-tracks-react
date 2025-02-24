import {
  Grid2 as Grid,
  LinearProgress,
  ListItem,
  ListItemText,
} from "@mui/material";
import { YtdlJobFormatted } from "@src/store/api/notifications";
import { FC } from "react";
import { TrackInfoListItem } from "../shared/TrackInfo.list-item";

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
        <LinearProgress variant="determinate" value={jobProgress.percent!} />
      );
    }
    if (job.state === "completed" || job.state === "failed") {
      const localTime = new Date(job.finishedOn).toLocaleTimeString("en-US", {
        hour: "2-digit",
        minute: "2-digit",
      });

      return <ListItemText secondary={localTime} />;
    }
  };

  return (
    <ListItem>
      <Grid container columns={12} width="100%" alignItems="center">
        <Grid size={6} display="flex" alignItems="center" flexDirection="row">
          <TrackInfoListItem
            imageSrc={job.data.meta.spotify.albumArt.small?.url}
            trackName={job.data.meta.spotify.trackName}
            artistName={job.data.meta.spotify.artistName}
          />
        </Grid>
        <Grid size={3}>
          <ListItemText secondary={job.state} />
        </Grid>
        <Grid size={3}>{getStatusDetailsComp()}</Grid>
      </Grid>

      {/* TODO: link to all-tracks */}
    </ListItem>
  );
};
