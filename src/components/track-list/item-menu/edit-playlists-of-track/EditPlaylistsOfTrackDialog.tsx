import { FC, useMemo } from "react";
import { AlertDialog } from "../../../shared/AlertDialog";
import { SelectablePlaylists } from "./SelectablePlaylists";
import {
  useEditPlaylistsOfTrackMutation,
  useGetAllPlaylistsQuery,
} from "@api/playlists";
import { ITrackResponseDto } from "@api/tracks";
import { useCheckboxListLogic } from "src/hooks/useCheckboxListLogic";
import { mergeTrackPlaylistsWithAllPlaylists } from "src/utils/playlist";

interface IEditPlaylistsOfTrackDialogProps {
  trackId: number;
  shouldOpenEditPlaylistsOfTrackDialog: boolean;
  playlists: ITrackResponseDto["playlists"];
  handleCloseEditPlaylistsOfTrackDialog: () => void;
}

export const EditPlaylistsOfTrackDialog: FC<
  IEditPlaylistsOfTrackDialogProps
> = ({
  trackId,
  shouldOpenEditPlaylistsOfTrackDialog,
  playlists: trackPlaylists,
  handleCloseEditPlaylistsOfTrackDialog,
}) => {
  const { data: allPlaylists, isLoading: isLoadingGetAllPlaylists } =
    useGetAllPlaylistsQuery();

  const [editPlaylistsOfTrack, { isLoading: isLoadingEditPlaylistsOfTrack }] =
    useEditPlaylistsOfTrackMutation();

  const playlistsPreSelected = useMemo(
    () =>
      allPlaylists !== undefined
        ? mergeTrackPlaylistsWithAllPlaylists(trackPlaylists, allPlaylists)
        : [],
    [trackPlaylists, allPlaylists]
  );

  const { items, itemsEqualToInitialState, handleToggle } =
    useCheckboxListLogic(playlistsPreSelected);

  const handleAddToPlaylistNegative = () => {
    handleCloseEditPlaylistsOfTrackDialog();
  };

  const handleAddToPlaylistAffirmative = async () => {
    const playlistsOfTrack = items
      .filter((item) => item.selected)
      .map((item) => ({
        id: item.id,
      }));

    try {
      await editPlaylistsOfTrack({
        params: { trackId },
        body: { playlists: playlistsOfTrack },
      }).unwrap();

      handleCloseEditPlaylistsOfTrackDialog();
      // TODO: dispatch notification that it was updated successfylly
    } catch (e) {
      // TODO: dispatch notification that it was NOT updated
    }
  };

  return (
    <AlertDialog
      open={shouldOpenEditPlaylistsOfTrackDialog}
      showSpinner={isLoadingGetAllPlaylists || isLoadingEditPlaylistsOfTrack}
      title="Add track to playlist"
      // todo should pass as a child when possible, this looks weird
      content={
        isLoadingGetAllPlaylists ? null : (
          <SelectablePlaylists
            playlistsPreSelected={items}
            handleToggle={handleToggle}
          />
        )
      }
      affirmativeButtonText="Save"
      negativeButtonText="Cancel"
      disableAffirmativeButton={itemsEqualToInitialState}
      onCloseNegative={handleAddToPlaylistNegative}
      onCloseAffirmative={handleAddToPlaylistAffirmative}
    ></AlertDialog>
  );
};
