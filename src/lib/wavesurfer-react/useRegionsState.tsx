import { IPlayerInstanceMethods } from "@src/components/player/Player";
import { useRegionsPlugin } from "@src/lib/wavesurfer-react";
import { RefObject, useMemo, useSyncExternalStore } from "react";

const makeRegionsStore = (
  regionsInstance: ReturnType<typeof useRegionsPlugin>["instance"],
  regionsInstanceMethods: ReturnType<typeof useRegionsPlugin>["instanceMethods"]
): {
  subscribe: (onStoreChange: () => void) => () => void;
  getSnapshot: () => Array<{
    id: string;
    name: string;
    start: number;
    end: number;
  }>;
} => {
  // our getSnapshot always returns a new object... so we end up in a loop.. so we need to cache it.
  let lastSnapshot: Array<{
    id: string;
    name: string;
    start: number;
    end: number;
  }> | null = null;

  return {
    subscribe: (listener) => {
      const unsubCbs = [
        regionsInstance.on("region-created", () => {
          lastSnapshot = null;
          listener();
        }),
        regionsInstance.on("region-updated", () => {
          lastSnapshot = null;
          listener();
        }),
        regionsInstance.on("region-content-changed", () => {
          lastSnapshot = null;
          listener();
        }),
        regionsInstance.on("region-removed", () => {
          lastSnapshot = null;
          listener();
        }),
      ];

      return () => {
        unsubCbs.forEach((unsub) => unsub());
      };
    },
    getSnapshot: () => {
      if (lastSnapshot !== null) {
        return lastSnapshot;
      }
      lastSnapshot = regionsInstanceMethods.getAllRegions();

      return lastSnapshot;
    },
  };
};

export const useRegionsState = (
  playerInstanceMethodsRef: RefObject<IPlayerInstanceMethods | null>
) => {
  const regionsStore = useMemo(
    () =>
      makeRegionsStore(
        playerInstanceMethodsRef.current?.regionsInstance,
        playerInstanceMethodsRef.current?.regionsMethods
      ),
    [playerInstanceMethodsRef]
  );

  const regions = useSyncExternalStore(
    regionsStore.subscribe,
    regionsStore.getSnapshot
  );

  return regions;
};
