import { Region } from "wavesurfer.js/dist/plugins/regions.esm.js";
import { regionPartTokens } from "./utils";

export class RegionMethods {
  static setOptions = (
    region: Region,
    options: Parameters<Region["setOptions"]>[0],
    extraOptions?: { patchStartAndEndTime?: boolean }
  ) => {
    const { patchStartAndEndTime = false } = extraOptions || {};

    // call to setOptions, resets our custom part tokens that we use to track our custom conditional state. So we need to save them and re-add them.
    const currentTokens = [...region.element.part.values()];
    const customTokensToAdd = Object.values<string>(regionPartTokens).filter(
      (customToken) => currentTokens.includes(customToken)
    );

    // fixes occurance of this bug to some extent... https://github.com/katspaugh/wavesurfer.js/issues/3631
    if (patchStartAndEndTime) {
      if (options.start !== undefined && options.end !== undefined) {
        const patchedOptions = {
          ...options,
          start: Number(options.start.toFixed(6)),
          end: Number(options.end.toFixed(6)),
        };
        region.setOptions(patchedOptions);
      } else {
        const patchedSelf = {
          ...options,
          start: Number(region.start.toFixed(6)),
          end: Number(region.end.toFixed(6)),
        };
        region.setOptions(patchedSelf);
      }
    } else {
      region.setOptions(options);
    }

    // after calling setOptions, re-add our custom tokens if any.
    customTokensToAdd.forEach((token) => region.element.part.add(token));
  };
}
