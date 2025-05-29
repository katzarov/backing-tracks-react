import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, Stack, SxProps, Theme, Typography } from "@mui/material";

interface ITrackInfoProps {
  imageSrc: string;
  trackName: string;
  artistName: string;
  linkToPlaylist?: {
    name: string;
    link: string;
  };
  sx?: SxProps<Theme>;
}

/**
 *
 * This is the component that displayes each track with its image, name of track, artist, and potentially a link to the playlist. (Not the best component name.)
 *
 * and big thanks to https://css-tricks.com/flexbox-truncated-text/
 * thats why we have the minWidth and overflow
 *
 */
export const TrackInfo: FC<ITrackInfoProps> = ({
  imageSrc,
  trackName,
  artistName,
  linkToPlaylist,
  sx,
}) => {
  return (
    <Stack direction="row" spacing={4} alignItems="center" minWidth={0} sx={sx}>
      {/* TODO load small image for mobile and larger for desktop https://developer.mozilla.org/en-US/docs/Web/API/HTMLImageElement/sizes */}
      <Avatar
        variant="rounded"
        src={imageSrc}
        alt={`${trackName}-${artistName}-art`}
        sx={{
          width: "4rem",
          height: "4rem",
        }}
      />
      <Stack
        direction="column"
        spacing={0.5}
        sx={{ alignItems: "flex-start" }}
        overflow="hidden"
      >
        <Typography variant="primaryBold" noWrap width="100%">
          {trackName}
        </Typography>
        <Typography variant="secondaryBold" noWrap width="100%">
          {artistName}
        </Typography>

        {linkToPlaylist && (
          <Typography variant="linkSubtle" width="100%" noWrap>
            <Link to={linkToPlaylist.link}>
              Playing from: {linkToPlaylist.name}
            </Link>
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
