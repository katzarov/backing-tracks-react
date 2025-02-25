import { FC } from "react";
import { ITracksOfPlaylistResponseDto } from "@src/store/api/playlists";
import { DeletePlaylistButton } from "./delete-playlist/DeletePlaylistButton";
import PlayArrowIcon from "@mui/icons-material/PlayArrow";
import {
  Button,
  Fade,
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
import { PlaylistCoverArt } from "./PlaylistCoverArt";

export interface IPlaylistDetailsProps {
  data: ITracksOfPlaylistResponseDto;
}

export const PlaylistDetails: FC<IPlaylistDetailsProps> = ({ data }) => {
  const triggerShrankMenu = useScrollTrigger({
    target: document.querySelector("main") ?? window,
    threshold: 300, // TODO need rem to px here cause the height of the playlist details compnent is in rem, or get the height of the component with getBoundingClientRect
  });

  const { id, name, description, tracks } = data;

  const bgAlbumArt =
    tracks.length > 0 ? tracks[0].meta.albumArt.large?.url || "" : "";
  const playlistNumberOfTracks = tracks.length; // TODO: keep num of tracks as a playlist column, or is there some DB way of computing this on the fly

  const playlistNumberOfTracksText =
    playlistNumberOfTracks === 1
      ? "1 track"
      : `${playlistNumberOfTracks} tracks`;

  return (
    <>
      <Fade in={triggerShrankMenu}>
        <StyledBoxShrankWithBgImage url={bgAlbumArt}>
          <StyledStackShrankMenu>
            <Stack
              direction="row"
              marginX={4}
              marginTop={4}
              alignItems="center"
            >
              <PlaylistCoverArt
                tracks={tracks}
                sx={{ width: "3rem", height: "3rem" }}
              />
              <Stack marginX={4}>
                <Typography variant="primaryBold"> {name}</Typography>
                <Typography variant="linkSubtle">
                  {playlistNumberOfTracksText}
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
        <StyledStackMenu p={4}>
          <Stack direction="row" marginLeft={4} alignItems="center">
            <PlaylistCoverArt
              tracks={tracks}
              sx={{ width: "12rem", height: "12rem" }}
            />
            <Stack marginLeft={6}>
              <Typography variant="h2"> {name}</Typography>
              <Typography variant="secondaryBold"> {description}</Typography>
              <Typography variant="linkSubtle">
                {playlistNumberOfTracksText}
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
