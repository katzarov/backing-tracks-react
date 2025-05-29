import {
  useRef,
  useEffect,
  useState,
  useMemo,
  forwardRef,
  useImperativeHandle,
} from "react";
import Box from "@mui/material/Box";

import { useRegionsPlugin, useWavesurfer } from "@src/lib/wavesurfer-react";
// import Timeline from "wavesurfer.js/dist/plugins/timeline.esm.js";
import { TrackLoader } from "@lib/track-loader";
import { ITrackResponseDto } from "@src/store/api/tracks";
import { PeaksLoader } from "@src/lib/peaks-loader";
import { formatFromSeconds } from "@src/utils/utils";
import { lighten, Stack, Typography, useTheme } from "@mui/material";
import {
  StyledLoadingOverlay,
  StyledLoadingOverlayMessage,
  StyledWaveSurfer,
} from "./Player.styled";
import { IPlaylistResponseDto } from "src/store/api/playlists";
import { useAppDispatch, useAppSelector } from "src/store";

import { isSafari } from "src/utils/detect-browser";
import {
  selectIsEditingRegions,
  selectIsLooping,
} from "@src/store/slices/player";

interface IPlayerProps {
  trackId: ITrackResponseDto["id"] | null;
  playlistId: IPlaylistResponseDto["id"] | null;
  trackUri: ITrackResponseDto["resourceId"] | null;
  // TODO should probably get the duration from wavesurfer.js, lets do it when we redo the binding with the lib although the current one is good as well as we got it via ffprobe
  duration: ITrackResponseDto["duration"] | null;
  regions: ITrackResponseDto["regions"];
}

// TODO make responsive
const timelineHeight = 0; // theme.typography.fontSize
const timelineHeightString = `${timelineHeight}px`;

// debounce the playing

// TODO  remove the timeline and put hte pointer that tells you the time on mouse hover and thats it.. but maybe show the timeline when adding a new region / editting

export type IWavesurferRef = ReturnType<
  typeof useWavesurfer
>["instanceMethods"];

export const Player = forwardRef<IWavesurferRef, IPlayerProps>(
  function PlayerInner(
    { trackId, playlistId, trackUri, duration, regions },
    wavesurferRef
  ) {
    const dispatch = useAppDispatch();
    const isEditingRegions = useAppSelector(selectIsEditingRegions);
    const isLooping = useAppSelector(selectIsLooping);

    const theme = useTheme();
    const containerRef = useRef(null);
    const [isPlayerLoading, setIsPlayerLoading] = useState(false); // TODO we prob want this in the slice.

    const {
      instance: regionsPluginInstance,
      instanceMethods: regionsPluginMethods,
    } = useRegionsPlugin({ isEditing: isEditingRegions, isLooping: isLooping });

    const plugins = useMemo(
      () => [regionsPluginInstance],
      [regionsPluginInstance]
    );

    const {
      instance: wavesurfer,
      isPlaying,
      currentTime,
      instanceMethods: wsMethods,
    } = useWavesurfer({
      container: containerRef,
      height: "auto",
      backend: isSafari ? "WebAudio" : "MediaElement",
      // https://github.com/katspaugh/wavesurfer.js/issues/3921 so maybe webaudio in safari, and mediaelement for the rest
      // when holding and scrolling the timeline medialeement has safari bugs
      waveColor: lighten(theme.palette.common.accent, 0.5),
      progressColor: theme.palette.common.accent,
      dragToSeek: true, // disable drag to seek when editing mode ?!! TODO
      plugins,
    });


    // the usage here is kinda anti-pattern-y but cool trick to show.
    // ... we can just create the wavesrufer instance in the parent above this and do a forwared ref for the target element that we want to append the wavesurfer to. But i dont want to move around logic this much right now.
    useImperativeHandle(
      wavesurferRef,
      (): IWavesurferRef => {
        return wsMethods;
      },
      [wsMethods]
    );

    useEffect(() => {
      if (wavesurfer === null) {
        return;
      }

      wavesurfer.once("error", (e) => console.log(e));

      if (trackUri === null) {
        wavesurfer.seekTo(0);
        wavesurfer.empty();
        return;
      }

      let didCancel = false;
      // TODO https://developer.mozilla.org/en-US/docs/Web/API/AbortController#constructor
      // for sure need to be able to abort the reqs for fetching tracks as they are quite big, 5-10mb per each track

      const loadTrackInPlayer = async () => {
        setIsPlayerLoading(true);
        wavesurfer.seekTo(0);
        // wavesurfer.empty();

        // TODO abort fetch if didCancel
        const blob = await TrackLoader.loadTrack(trackUri);
        if (blob === null) {
          console.warn("track is null");
          setIsPlayerLoading(false);
          return;
        }

        const peaks = await PeaksLoader.loadPeaks(trackUri);

        if (peaks === null) {
          if (didCancel) {
            return;
          }
          // TODO show computing peaks loader
          await wavesurfer.loadBlob(blob!);
          const exportedPeaks = wavesurfer.exportPeaks();

          // TODO: try delete key first? maybe its null cause failed to save last time exports and needs cleanup now...
          await PeaksLoader.savePeaks(trackUri, exportedPeaks);
        } else {
          if (didCancel) {
            return;
          }
          await wavesurfer.loadBlob(blob!, peaks);
        }

        // add regions once track is loaded.
        regions.forEach((region) => {
          regionsPluginMethods.addRegion(
            {
              id: region.id,
              name: region.name,
              start: region.start,
              end: region.end,
            },
            false
          );
        });

        // handle error
        setIsPlayerLoading(false);
      };

      loadTrackInPlayer();

      return () => {
        regionsPluginMethods.clearRegions();
        didCancel = true;
      };
    }, [wavesurfer, trackUri, regions]);

    const formattedCurrentTime = formatFromSeconds(currentTime);
    const formattedDuration = formatFromSeconds(duration ?? 0);

    return (
      <Stack direction="row" alignItems="center" gap={1} width="100%">
        <Typography variant="linkSubtle" sx={{ mb: timelineHeightString }}>
          {formattedCurrentTime}
        </Typography>

        <Box sx={{ position: "relative", flexGrow: 1 }}>
          <StyledWaveSurfer ref={containerRef} />

          {/* TODO only show if track is not found in IndexeDB, and needs to fetched from server. Also show if, track is found in IndexedDB but the peaks are not and need to be computed */}
          {isPlayerLoading && (
            <>
              <StyledLoadingOverlay />
              <StyledLoadingOverlayMessage>
                Loading audio
              </StyledLoadingOverlayMessage>
            </>
          )}
        </Box>
        <Typography variant="linkSubtle" sx={{ mb: timelineHeightString }}>
          {formattedDuration}
        </Typography>
      </Stack>
    );
  }
);
