import Regions, { Region } from "wavesurfer.js/dist/plugins/regions.esm.js";
import { ITrackResponseDto } from "@src/store/api/tracks";
import { regionPartTokens } from "./utils";
import { RegionMethods } from "./region-methods";

type IRegion = ITrackResponseDto["regions"][number];

export class RegionsMethods {
  constructor(private regionsInstance: Regions) {}

  /**
   * @throws {Error} some_error message when can't add region
   */
  addRegion = (region: IRegion, editable: boolean) => {
    const newRegion = this.regionsInstance.addRegion({
      ...region,
      content: region.name,
      drag: editable,
      resize: editable,
    });

    if (editable) {
      this.setStyleToken(newRegion.element, regionPartTokens.editable, true);
    }

    return newRegion;
  };

  getAllRegions = () => {
    return this.regionsInstance
      .getRegions()
      .map((region) => this.adaptRegionObj(region)) satisfies IRegion[];
  };

  // removeRegion = (region: Region) => {
  //   return region.remove();
  // };

  clearRegions = () => {
    return this.regionsInstance.clearRegions();
  };

  highlightSelectedRegion = (selectedRegionId: string | null) => {
    this.regionsInstance.getRegions().forEach((region) => {
      const isRegionSelected = region.id === selectedRegionId;

      this.setStyleToken(
        region.element,
        regionPartTokens.selected,
        isRegionSelected
      );
    });
  };

  /**
   *
   * @param cb
   * @returns unsub cb
   */
  // todo needs to handle two modes - play and eidt
  // whne play it will play reigo
  // whne edit it will just select it no playing

  onRegionClicked = (clientCb: (region: Region, e) => void) => {
    // const adaptRegionObjAndCallClientCb = (regionLib: Region, e) => {
    //   e.stopPropagation(); // prevent triggering a click on the waveform

    //   regionLib.play(); // todo depend on mode
    //   // needs to set on region out if loop is enabled and aslo need to be able to celan the loop if next track or other region is clikced

    //   const adaptedRegionObj = this.adaptRegionObj(regionLib);
    //   clientCb(adaptedRegionObj, e);
    // };
    return this.regionsInstance.on("region-clicked", clientCb);
  };

  /**
   *
   * @param cb
   * @returns unsub cb
   */
  onRegionOut = (clientCb: (region: Region) => void) => {
    return this.regionsInstance.on("region-out", clientCb);
  };

  setRegionsEditable = (editable: boolean) => {
    this.regionsInstance.getRegions().forEach((region) => {
      RegionMethods.setOptions(region, { drag: editable, resize: editable });
      this.setStyleToken(region.element, regionPartTokens.editable, editable);
    });
  };

  /**
   *
   * @returns disableDragSelection
   */
  enableDragSelection = () => {
    return this.regionsInstance.enableDragSelection({});
  };

  playRegionById = (selectedRegionId: string) => {
    const region = this.regionsInstance
      .getRegions()
      .find((region) => region.id === selectedRegionId);

    if (region) {
      region.play();
    } else {
      // throw and later show err boundary ?
      console.error("region to play not found.");
    }
  };

  /**
   *
   * Sets the part token.
   * A bit of a generic interface so that it is easy to replace impl later if we need to use classnames or do something else.
   */
  private setStyleToken = (
    element: HTMLElement,
    token: string,
    shouldAddToken: boolean
  ) => {
    if (shouldAddToken) {
      element.part.add(token);
    } else {
      element.part.remove(token);
    }
  };

  private adaptRegionObj = (region: Region) => {
    if (typeof region.content?.innerHTML !== "string") {
      throw new Error("Region content should contain a string value.");
    }

    return {
      id: region.id,
      name: region.content?.innerHTML,
      start: region.start,
      end: region.end,
    } satisfies IRegion;
  };
}
