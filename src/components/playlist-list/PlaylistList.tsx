import List from "@mui/material/List";
import { useGetAllPlaylistsQuery } from "@api/playlists";
import { PlaylistListItem } from "./PlaylistListItem";

export const PlaylistList = () => {
  const { data, isLoading, isError } = useGetAllPlaylistsQuery();

  if (isLoading || isError) return "Loading";

  return (
    <List sx={{ width: "100%", bgcolor: "background.paper" }}>
      {data?.map((item) => {
        return (
          <PlaylistListItem
            key={item.id}
            id={item.id}
            name={item.name}
            description={item.description}
          />
        );
      })}
    </List>
  );
};
