import Regions, { Region } from "wavesurfer.js/dist/plugins/regions.esm.js";
import { ITrackResponseDto } from "@src/store/api/tracks";

type IRegion = ITrackResponseDto["regions"][number];

// todo will just do a global feature catch on this library and introduce react error boundary.

interface Theme {
  regionColor: string;
}

export class RegionsMethods {
  constructor(private regionsInstance: Regions, private theme: Theme) {}

  /**
   * @throws {Error} some_error message when can't add region
   */
  addRegion = (region: IRegion, editable: boolean) => {
    return this.regionsInstance.addRegion({
      ...region,
      content: region.name,
      color: this.theme.regionColor,
      drag: editable,
      resize: editable,
    });
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
      region.setOptions({
        color: isRegionSelected
          ? "rgba(0, 43, 255, 0.5)"
          : this.theme.regionColor,
      });
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

  setRegionsEditable = (ediable: boolean) => {
    this.regionsInstance
      .getRegions()
      .forEach((region) =>
        region.setOptions({ drag: ediable, resize: ediable })
      );
  };

  /**
   *
   * @returns disableDragSeleciton
   */
  enableDragSelection = () => {
    return this.regionsInstance.enableDragSelection({
      color: "rgba(255, 0, 0, 0.1)",
    });
  };

  // setRegionName = (ediable: boolean) => {
  //   this.regionsInstance
  //     .getRegions()
  //     .forEach((region) =>
  //       region.setOptions({ drag: ediable, resize: ediable })
  //     );
  // };

  private adaptRegionObj = (region: Region) => {
    return {
      id: region.id,
      name: region.content?.innerHTML || "TODO",
      start: region.start,
      end: region.end,
    } satisfies IRegion;
  };
}
