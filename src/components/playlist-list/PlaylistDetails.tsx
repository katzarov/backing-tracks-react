import { FC } from "react";
import { ITracksOfPlaylistResponseDto } from "@src/store/api/playlists";
import { DeletePlaylistButton } from "./delete-playlist/DeletePlaylistButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Button,
  Fade,
  ImageList,
  ImageListItem,
  Stack,
  Typography,
  useScrollTrigger,
} from "@mui/material";
import {
  StyledBoxShrankWithBgImage,
  StyledBoxWithBgImage,
  StyledStackMenu,
  StyledStackShrankMenu,
} from "./PlaylistDetails.styled";

interface IPlaylistDetailsProps {
  data: ITracksOfPlaylistResponseDto | undefined;
  isLoading: boolean;
}

export const PlaylistDetails: FC<IPlaylistDetailsProps> = ({
  data,
  isLoading,
}) => {
  const triggerShrankMenu = useScrollTrigger({
    target: document.querySelector("main") ?? window,
    threshold: 300, // TODO need rem to px here cause the height of the playlist details compnent is in rem, or get the height of the component with getBoundingClientRect
  });

  // TODO in general: handle this state in a separate component
  if (isLoading) {
    return "loading skeleton";
  }

  const { id, name, description, tracks } = data!;

  const getImageListItem = (id: number, url: string, alt: string) => {
    return (
      <ImageListItem key={id}>
        <img src={url} alt={alt} />
      </ImageListItem>
    );
  };

  // TODO create some image mixer, should ideally do it on the BE in the future.
  const ImageList4x4 = (
    <ImageList sx={{ width: "10rem", height: "10rem" }} cols={2} gap={0}>
      {tracks
        .slice(0, 4)
        .map((track) =>
          getImageListItem(
            track.id,
            track.meta.albumArt.small?.url || "",
            track.meta.trackName
          )
        )}
    </ImageList>
  );

  const bgAlbumArt =
    tracks.length > 0 ? tracks[0].meta.albumArt.large?.url || "" : "";
  const playlistNumberOfTracks = tracks.length; // TODO: keep num of tracks as a playlist column, or is there some DB way of computing this on the fly

  return (
    <>
      <Fade in={triggerShrankMenu}>
        <StyledBoxShrankWithBgImage url={bgAlbumArt}>
          <StyledStackShrankMenu>
            <Stack direction="row" marginX={4}>
              <Stack marginX={4}>
                <Typography variant="body1"> {name}</Typography>
                <Typography variant="caption">
                  {playlistNumberOfTracks} tracks
                </Typography>
              </Stack>
              <Button
                size="medium"
                variant="contained"
                startIcon={<PlayArrowIcon />}
                disabled={!triggerShrankMenu}
              >
                Play
              </Button>
            </Stack>
          </StyledStackShrankMenu>
        </StyledBoxShrankWithBgImage>
      </Fade>
      <StyledBoxWithBgImage url={bgAlbumArt}>
        <StyledStackMenu>
          <Stack direction="row" marginLeft={4} alignItems="baseline">
            {ImageList4x4}
            <Stack marginLeft={2}>
              <Typography variant="h2"> {name}</Typography>
              <Typography variant="caption"> {description}</Typography>
              <Typography variant="caption">
                {playlistNumberOfTracks} tracks
              </Typography>
            </Stack>
          </Stack>
          <Stack direction="row" marginX={4}>
            <Button
              size="large"
              variant="contained"
              startIcon={<PlayArrowIcon />}
              disabled={triggerShrankMenu}
              sx={{
                marginRight: "auto",
              }}
            >
              Play
            </Button>
            {/* // TODO add tracks to playlist button */}
            {/* // TODO update playst name/description button */}
            <DeletePlaylistButton
              playlistId={id}
              playlistName={name}
              disabled={triggerShrankMenu}
            />
          </Stack>
        </StyledStackMenu>
      </StyledBoxWithBgImage>
    </>
  );
};
