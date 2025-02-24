import { FC } from "react";
import { PlaylistDetails } from "./PlaylistDetails";
import { ITracksOfPlaylistResponseDto } from "@src/store/api/playlists";
import { PlaylistDetailsLoadingSkeleton } from "./PlaylistDetails.loading-skeleton";

interface IPlaylistDetailsLoadingContainerProps {
  data: ITracksOfPlaylistResponseDto | undefined;
  isLoading: boolean;
}

export const PlaylistDetailsLoadingContainer: FC<
  IPlaylistDetailsLoadingContainerProps
> = ({ data, isLoading }) => {
  if (isLoading) {
    return <PlaylistDetailsLoadingSkeleton />;
  }
  return <PlaylistDetails data={data!} />;
};
