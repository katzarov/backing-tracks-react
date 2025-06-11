import { useState, useMemo, useEffect } from "react";
import Regions from "wavesurfer.js/dist/plugins/regions.esm.js";
import { RegionsMethods } from "./regions-methods";
import { useAppDispatch, useAppSelector } from "@src/store";
import { selectRegionId, setRegionId } from "@src/store/slices/player";
import { RegionMethods } from "./region-methods";

const useRegionsPluginInstance = () => {
  const [regionsPlugin, setRegionsPlugin] = useState<Regions | null>(null);

  useEffect(() => {
    const instance = Regions.create();

    setRegionsPlugin(instance);

    return () => {
      instance.destroy();
      // todo actually when i pass this as a plugin, maybe the ws instnace already calls the destroy on this ???
      // yes it does https://github.com/katspaugh/wavesurfer.js/blob/2265852920a035666c03568f9a2b00d78b7af41c/src/wavesurfer.ts#L649
    };
  }, []);

  return regionsPlugin;
};

const useRegionsPluginState = (
  regionsInstance: Regions,
  isLooping: boolean,
  isEditing: boolean
) => {
  const selectedRegionId = useAppSelector(selectRegionId);
  const dispatch = useAppDispatch();

  useEffect(() => {
    const timerIds: Array<number> = [];
    const unsubCbs = [
      regionsInstance.on("region-updated", (region) => {
        RegionMethods.setOptions(region, {}, { patchStartAndEndTime: true });
      }),
      regionsInstance.on("region-created", (region) => {
        RegionMethods.setOptions(
          region,
          {
            ...(isEditing && { id: crypto.randomUUID() }), // I think, ideally, the server should recreate the id on the server and this uuid here should just be temporary.
            ...(isEditing && { content: "Untitled" }),
          },
          { patchStartAndEndTime: true }
        );

        if (isEditing) {
          dispatch(setRegionId(region.id));
        }
      }),
      regionsInstance.on("region-clicked", (region, e) => {
        console.debug("region-clicked");

        e.stopPropagation(); // prevent triggering a click on the waveform

        if (!isEditing) {
          region.play(); // TODO it could throw
        }

        dispatch(setRegionId(region.id));
      }),
      regionsInstance.on("region-out", (region) => {
        // run region-out cb after waveform click cb.
        const timerId = setTimeout(() => {
          console.debug("region-out");

          if (selectedRegionId !== region.id || selectedRegionId === null) {
            // we have either just selected a new region, when the region-clicked cb just ran.
            // or we have just deselected the region, when the wavesurfer click cb just ran.
            // or we have two overlapping regions and the wider one is selected, and in this case the region-out cb for the smaller one runs event though it is not selected.
            return;
          }

          if (isLooping) {
            region.play();
          } else {
            dispatch(setRegionId(null));
          }
        }, 0);

        // when we have two or more overlapping regions, we have two "region-out" events, so two timers for this event are set - reason why we keep an array.
        timerIds.push(timerId);
      }),
    ];

    return () => {
      timerIds.forEach((id) => clearTimeout(id));
      unsubCbs.forEach((unsub) => unsub());
    };
  }, [dispatch, regionsInstance, isLooping, isEditing, selectedRegionId]);

  return useMemo(
    () => ({
      selectedRegionId,
    }),
    [selectedRegionId]
  );
};

const useRegionsEffects = (
  regionInstanceMethods: RegionsMethods,
  selectedRegionId: string | null,
  isEditing: boolean
) => {
  // recolor based on selected region
  useEffect(() => {
    regionInstanceMethods.highlightSelectedRegion(selectedRegionId);
  }, [selectedRegionId, regionInstanceMethods]);

  // make regions editable
  useEffect(() => {
    if (!isEditing) {
      return;
    }

    const disableDragSelection = regionInstanceMethods.enableDragSelection();
    regionInstanceMethods.setRegionsEditable(true);

    return () => {
      regionInstanceMethods.setRegionsEditable(false);
      disableDragSelection();
    };
  }, [regionInstanceMethods, isEditing]);
};

interface IUseRegionsPluginProps {
  isLooping: boolean;
  isEditing: boolean;
}
export const useRegionsPlugin = ({
  isLooping,
  isEditing,
}: IUseRegionsPluginProps) => {
  const instance = useMemo(() => Regions.create(), []);
  //   const instance = useRegionsPluginInstance(container, options); // no need for this. WS instance will manage this plugin. ?

  const instanceMethods = useMemo(
    () => new RegionsMethods(instance),
    [instance]
  );

  const state = useRegionsPluginState(instance, isLooping, isEditing);

  useRegionsEffects(instanceMethods, state.selectedRegionId, isEditing);

  return useMemo(
    () => ({ ...state, instance, instanceMethods }),
    [instance, state, instanceMethods]
  );
};
