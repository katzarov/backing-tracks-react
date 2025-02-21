import { FC } from "react";
import { Avatar, ListItemAvatar, ListItemText } from "@mui/material";

interface ITrackInfoListItemProps {
  imageSrc?: string;
  trackName: string;
  artistName: string;
}

/**
 * Version of TrackInfo component made specifically for usage in MUI List Components.
 *
 */
export const TrackInfoListItem: FC<ITrackInfoListItemProps> = ({
  imageSrc,
  trackName,
  artistName,
}) => {
  return (
    <>
      <ListItemAvatar>
        <Avatar
          variant="square"
          src={imageSrc}
          alt={`${trackName}-${artistName}-art`}
        />
      </ListItemAvatar>
      <ListItemText
        slotProps={{
          primary: {
            // variant: "primary",
            noWrap: true,
          },
          secondary: {
            // variant: "secondary",
            noWrap: true,
          },
        }}
        primary={trackName}
        secondary={artistName}
      ></ListItemText>
    </>
  );
};
