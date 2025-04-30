import { FC } from "react";
import { ImageList, ImageListItem, SxProps, Theme } from "@mui/material";
import ImageNotSupportedIcon from "@mui/icons-material/ImageNotSupported";
import { ITrackResponseDto } from "@src/store/api/tracks";

interface IPlaylistCoverArtProps {
  tracks: ITrackResponseDto[];
  sx?: SxProps<Theme>;
}

interface IDuplicatedTrack extends Omit<ITrackResponseDto, "id"> {
  id: number | string;
}

const getImageListItem = (id: number | string, url: string, alt: string) => {
  return (
    <ImageListItem key={id}>
      <img src={url} alt={alt} />
    </ImageListItem>
  );
};

export const PlaylistCoverArt: FC<IPlaylistCoverArtProps> = ({
  tracks,
  sx,
}) => {
  if (tracks.length === 0) {
    return <ImageNotSupportedIcon color="primary" sx={{ my: 4, ...sx }} />;
  }

  if (tracks.length === 1) {
    return (
      <ImageList sx={{ ...sx }} cols={1} gap={0}>
        {getImageListItem(
          tracks[0].id,
          tracks[0].meta.albumArt.medium?.url || "",
          tracks[0].meta.trackName
        )}
      </ImageList>
    );
  }

  if (tracks.length === 2 || tracks.length === 3) {
    const tracksDuplicatedItems: IDuplicatedTrack[] = [
      ...tracks,
      ...tracks,
    ].map((item, index) =>
      index < tracks.length ? item : { ...item, id: `${item.id}-copy` }
    );

    return (
      <ImageList sx={{ ...sx }} cols={2} gap={0}>
        {tracksDuplicatedItems
          .slice(0, 4)
          .map((track) =>
            getImageListItem(
              track.id,
              track.meta.albumArt.medium?.url || "",
              track.meta.trackName
            )
          )}
      </ImageList>
    );
  }

  return (
    <ImageList sx={{ ...sx }} cols={2} gap={0}>
      {tracks
        .slice(0, 4)
        .map((track) =>
          getImageListItem(
            track.id,
            track.meta.albumArt.medium?.url || "",
            track.meta.trackName
          )
        )}
    </ImageList>
  );
};
