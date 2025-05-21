import { skipToken } from "@reduxjs/toolkit/query";
import { useAppSelector } from "src/store";
import { useGetTracksOfPlaylistQueryState } from "src/store/api/playlists";
import { ITrackResponseDto, useGetTrackQuery } from "src/store/api/tracks";
import { selectPlaylistId, selectTrackId } from "src/store/slices/player";

interface ICurrentTrackPlaylistTuple {
  trackId: number | null;
  trackName: string;
  artistName: string;
  trackUri: string | null;
  trackDuration: number | null;
  playlistId: number | null;
  playlistName: string;
  albumImageSrc: string;
  regions: ITrackResponseDto["regions"];
}

const noCurrentTrack: ICurrentTrackPlaylistTuple = {
  trackId: null,
  trackName: "",
  artistName: "",
  trackUri: null,
  trackDuration: null,
  playlistId: null,
  playlistName: "",
  albumImageSrc: "",
  regions: [],
};

/**
 * if current track is from all tracks, ie no playlist, we just do getTrack, because we dont need a playlist - there is no autoplay feat in this case
 * if track is from playlist, we need to do getTracksOfPlaylist, bacasue there is autoplay and we need to sub for it here, regardless of where we go in the UI
 */


// TODO this is all terrible => remove this hook and simplify
export const useSelectedTrackPlaylistData = (): ICurrentTrackPlaylistTuple => {
  const trackId = useAppSelector(selectTrackId);
  const playlistId = useAppSelector(selectPlaylistId);

  // TODO: can probably just initate the whole endpoint useGetTracksOfPlaylistQuery(to keep sub) and just still select only the single track here, instead of managing it in the listener effect!

  // this hook does not sub, the player listener keeps sub, here we only select from result.
  const { trackFromGetTracksOfPlaylist } = useGetTracksOfPlaylistQueryState(
    playlistId ?? skipToken,
    {
      skip: trackId === null, // i dont think we have a case where track is null and playlist is NOT null ?
      // is this selector optimal or rerenders all the time ? TODO
      selectFromResult: ({ data }) => {
        const playlistData =
          data !== undefined
            ? {
                id: data.id,
                name: data.name,
                description: data.description,
              }
            : null;

        return {
          trackFromGetTracksOfPlaylist: {
            track: data?.tracks.find((track) => track.id === trackId),
            playlist: playlistData,
          },
        };
      },
    }
  );

  // essentially, skips(=> & unsubs) when there is no track selected,
  // also skips(=> & unsubs) when we have a playlist selected = in that case we get the track data from the whole list response
  const { data: trackFromGetTrack } = useGetTrackQuery(trackId ?? skipToken, {
    skip: playlistId !== null,
  });

  if (trackId !== null && playlistId !== null) {
    if (
      trackFromGetTracksOfPlaylist.track === undefined ||
      trackFromGetTracksOfPlaylist.playlist === null
    ) {
      return noCurrentTrack;
    }
    return {
      trackId: trackFromGetTracksOfPlaylist.track.id,
      trackName: trackFromGetTracksOfPlaylist.track.meta.trackName,
      artistName: trackFromGetTracksOfPlaylist.track.meta.artist.artistName,
      trackUri: trackFromGetTracksOfPlaylist.track.resourceId,
      trackDuration: trackFromGetTracksOfPlaylist.track.duration,
      playlistId: trackFromGetTracksOfPlaylist.playlist.id,
      playlistName: trackFromGetTracksOfPlaylist.playlist.name,
      albumImageSrc:
        trackFromGetTracksOfPlaylist.track.meta.albumArt.small?.url || "",
      regions: trackFromGetTracksOfPlaylist.track.regions,
    };
  }

  if (trackId !== null && playlistId === null) {
    if (trackFromGetTrack === undefined) {
      return noCurrentTrack;
    }

    return {
      trackId: trackFromGetTrack.id,
      trackName: trackFromGetTrack.meta.trackName,
      artistName: trackFromGetTrack.meta.artist.artistName,
      trackUri: trackFromGetTrack.resourceId,
      trackDuration: trackFromGetTrack.duration,
      playlistId: null,
      playlistName: "",
      albumImageSrc: trackFromGetTrack.meta.albumArt.small?.url || "",
      regions: trackFromGetTrack.regions,
    };
  }

  return noCurrentTrack;
};
