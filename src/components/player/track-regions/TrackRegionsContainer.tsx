import { useAppSelector } from "@src/store";
import { selectIsEditingRegions } from "@src/store/slices/player";
import { IPlayerInstanceMethods } from "../Player";
import { FC, RefObject } from "react";
import { TrackRegionsViewMode } from "./TrackRegionsViewMode";
import { ITrackResponseDto } from "@src/store/api/tracks";

interface ITrackRegionsContainerProps {
  playerInstanceMethodsRef: RefObject<IPlayerInstanceMethods | null>;
  regions: ITrackResponseDto["regions"];
}

export const TrackRegionsContainer: FC<ITrackRegionsContainerProps> = ({
  playerInstanceMethodsRef,
  regions,
}) => {
  const isEditingRegions = useAppSelector(selectIsEditingRegions);

  return (
    <>
      {isEditingRegions ? null : (
        <TrackRegionsViewMode
          regions={regions}
          playerInstanceMethodsRef={playerInstanceMethodsRef}
        />
      )}
    </>
  );
};
