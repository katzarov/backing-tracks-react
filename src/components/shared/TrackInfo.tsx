import { FC } from "react";
import { Link } from "react-router-dom";
import { Avatar, Stack, Typography } from "@mui/material";

interface ITrackInfoProps {
  imageSrc: string;
  trackName: string;
  artistName: string;
  linkToPlaylist?: {
    name: string;
    link: string;
  };
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
}) => {
  return (
    <Stack direction="row" spacing={4} alignItems="center" minWidth={0}>
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
        <Typography
          color="textPrimary"
          fontSize={"0.9rem"}
          fontWeight={600}
          noWrap
          width="100%"
        >
          {trackName}
        </Typography>
        <Typography
          color="textSecondary"
          fontSize={"0.9rem"}
          fontWeight={600}
          noWrap
          width="100%"
        >
          {artistName}
        </Typography>

        {linkToPlaylist && (
          <Typography
            textTransform="uppercase"
            color="textSecondary"
            fontSize={"0.7rem"}
            fontWeight={500}
            noWrap
            width="100%"
            sx={{
              "& > a": {
                color: "unset",
                textDecoration: "unset",
              },
              "& > a:hover": {
                textDecoration: "underline",
              },
            }}
          >
            <Link to={linkToPlaylist.link}>
              Playing from: {linkToPlaylist.name}
            </Link>
          </Typography>
        )}
      </Stack>
    </Stack>
  );
};
