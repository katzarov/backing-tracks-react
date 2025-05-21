// used this as starting point https://github.com/katspaugh/wavesurfer-react/blob/main/src/index.tsx

import { useAppDispatch, useAppSelector } from "@src/store";
import {
  selectIsPlaying,
  setRegionId,
  wavesurferEvent,
} from "@src/store/slices/player";
import {
  useState,
  useMemo,
  useEffect,
  useRef,
  memo,
  type ReactElement,
  type RefObject,
} from "react";
import WaveSurfer, {
  type WaveSurferEvents,
  type WaveSurferOptions,
} from "wavesurfer.js";
import { WavesuferMethods } from "./wavesurfer-methods";
import { selectedRegionRef } from "./regions";

export type IWavesurferEvents = keyof WaveSurferEvents;

function useWavesurferInstance(
  containerRef: RefObject<HTMLDivElement | null>,
  options: Partial<WaveSurferOptions>
): WaveSurfer | null {
  const [wavesurfer, setWavesurfer] = useState<WaveSurfer | null>(null);
  // Flatten options object to an array of keys and values to compare them deeply in the hook deps
  const flatOptions = useMemo(() => Object.entries(options).flat(), [options]);

  // Create a wavesurfer instance
  useEffect(() => {
    if (!containerRef?.current) return;

    const ws = WaveSurfer.create({
      ...options,
      container: containerRef.current,
    });

    setWavesurfer(ws);

    return () => {
      ws.destroy();
    };
  }, [containerRef, ...flatOptions]);

  return wavesurfer;
}

/**
 * Use wavesurfer state
 */
function useWavesurferState(wavesurfer: WaveSurfer | null): {
  isReady: boolean;
  isPlaying: boolean;
  currentTime: number;
} {
  const [isReady, setIsReady] = useState<boolean>(false);
  const [hasFinished, setHasFinished] = useState<boolean>(false);
  const [currentTime, setCurrentTime] = useState<number>(0);
  const dispatch = useAppDispatch();
  const isPlaying = useAppSelector(selectIsPlaying);

  useEffect(() => {
    if (!wavesurfer) {
      return;
    }

    const unsubscribeCbs = [
      wavesurfer.on("load", () => {
        setIsReady(false);
        dispatch(wavesurferEvent("load"));
        setCurrentTime(0);
      }),

      wavesurfer.on("ready", () => {
        setIsReady(true);
        dispatch(wavesurferEvent("ready"));
        setHasFinished(false);
        setCurrentTime(0);
      }),

      wavesurfer.on("finish", () => {
        setHasFinished(true);
      }),

      wavesurfer.on("play", () => {
        dispatch(wavesurferEvent("play"));
      }),

      wavesurfer.on("pause", () => {
        dispatch(wavesurferEvent("pause"));
      }),

      wavesurfer.on("timeupdate", () => {
        const truncatedTime = Math.trunc(wavesurfer.getCurrentTime());
        // we are still calling setCurrentTime a bunch of times.. but most of the time the new value is the same as the old one, so react does not trigger a rerender!
        setCurrentTime(truncatedTime);
      }),

      wavesurfer.on("destroy", () => {
        setIsReady(false);
        dispatch(wavesurferEvent("destroy"));
      }),

      // wavesurfer.getActivePlugins() get region here.... ???
      wavesurfer.on("click", () => {
        console.debug("click-waveform");

        selectedRegionRef.value = null;
        dispatch(setRegionId(null));
      }),
    ];

    return () => {
      unsubscribeCbs.forEach((cb) => cb());
    };
  }, [wavesurfer]);

  return useMemo(
    () => ({
      isReady,
      isPlaying,
      hasFinished,
      currentTime,
    }),
    [isPlaying, hasFinished, currentTime, isReady]
  );
}

// todo maybe pass cb to the event listenres, so we can do useWavesurfer(onErrorCb, onPlayCb etc). or provide ability to add more listenres via the WaveSurferMethods
export const useWavesurfer = ({
  container,
  ...options
}: Omit<WaveSurferOptions, "container"> & {
  container: RefObject<HTMLDivElement | null>;
}) => {
  const instance = useWavesurferInstance(container, options);
  const instanceState = useWavesurferState(instance);
  const instanceMethods = useMemo(
    () => new WavesuferMethods(instance),
    [instance]
  );

  return useMemo(
    () => ({ ...instanceState, instance, instanceMethods }),
    [instance, instanceState, instanceMethods]
  );
};
