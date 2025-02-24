import { FC } from "react";
import { Skeleton, SxProps, Theme } from "@mui/material";
import { IPlaylistDetailsProps, PlaylistDetails } from "./PlaylistDetails";

interface IPlaylistDetailsLoadingSkeletonProps {
  sx?: SxProps<Theme>;
}

const playlistDetailsMockProps: IPlaylistDetailsProps = {
  data: {
    id: 1,
    name: "",
    description: "",
    tracks: [],
  },
};

export const PlaylistDetailsLoadingSkeleton: FC<
  IPlaylistDetailsLoadingSkeletonProps
> = ({ sx }) => {
  return (
    <Skeleton variant="rounded" width={"100%"} sx={{ ...sx }}>
      <PlaylistDetails {...playlistDetailsMockProps} />
    </Skeleton>
  );
};
