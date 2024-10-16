import { useAppDispatch } from "@src/store";
import { setTrackPlaylistTuple } from "@src/store/slices/player";
import { useEffect, useRef } from "react";
import { useAppPathParams } from "./useAppPathParams";
import { LocalStorage } from "@src/lib/browser-storage";

export const useTrackSelector = () => {
  const initTrackSelectorHasRun = useRef(false);
  const dispatch = useAppDispatch();
  const {
    isPathAllTracksTrackId,
    isPathPlaylistIdTrackId,
    trackId,
    playlistId,
  } = useAppPathParams();

  // detect all user initiated track/playlist changes after the app load track selection has already been done.
  useEffect(() => {
    if (!initTrackSelectorHasRun.current) {
      return;
    }

    if (isPathAllTracksTrackId || isPathPlaylistIdTrackId) {
      dispatch(
        setTrackPlaylistTuple({
          trackId,
          playlistId,
        })
      );

      // TODO: need to sync accross browser tabs,
      // need to do the tab sync lib
      // also maybe setup redux persist, or write my own simple middleware
      LocalStorage.write("trackId", trackId);
      LocalStorage.write("playlistId", playlistId);
    }
  }, [
    playlistId,
    trackId,
    isPathAllTracksTrackId,
    isPathPlaylistIdTrackId,
    dispatch,
  ]);

  // On initial app load: check if url has a track we want to load, or load last played track from local storage.
  useEffect(() => {
    if (initTrackSelectorHasRun.current) {
      return;
    }

    // first try load track from url params
    if (isPathAllTracksTrackId || isPathPlaylistIdTrackId) {
      dispatch(setTrackPlaylistTuple({ trackId, playlistId }));
    } else {
      // try load last played track from local storage
      const savedTrackId = LocalStorage.read<number>("trackId");
      const savedPlaylistId = LocalStorage.read<number>("playlistId");

      if (savedTrackId !== null) {
        dispatch(
          setTrackPlaylistTuple({
            trackId: savedTrackId,
            playlistId: savedPlaylistId,
          })
        );
      }
      // else, no track to preload
    }

    initTrackSelectorHasRun.current = true;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
