import EditIcon from "@mui/icons-material/Edit";
import {
  Box,
  Button,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Typography,
} from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/store";
import {
  selectRegionId,
  setIsEditingRegions,
  setRegionId,
} from "@src/store/slices/player";
import { IPlayerInstanceMethods } from "../Player";
import { FC, RefObject } from "react";
import { ITrackResponseDto } from "@src/store/api/tracks";

interface ITrackRegionsViewModeProps {
  playerInstanceMethodsRef: RefObject<IPlayerInstanceMethods | null>;
  regions: ITrackResponseDto["regions"];
}

export const TrackRegionsViewMode: FC<ITrackRegionsViewModeProps> = ({
  playerInstanceMethodsRef,
  regions,
}) => {
  const regionId = useAppSelector(selectRegionId);
  const dispatch = useAppDispatch();

  const handeEditRegionsClick = () => {
    dispatch(setIsEditingRegions(true));
  };

  const regionsList = (
    <List sx={{ width: "100%", height: "6rem", overflowY: "auto" }}>
      {regions.map((region) => {
        const labelId = `checkbox-list-label-${region.name}`;

        const isSelected = region.id === regionId;

        const handleRegionClick = () => {
          dispatch(setRegionId(region.id));
          playerInstanceMethodsRef.current?.regionsMethods.playRegionById(
            region.id
          );
        };

        return (
          <ListItem key={region.id} disablePadding>
            <ListItemButton
              role={undefined}
              onClick={handleRegionClick}
              selected={isSelected}
              sx={{ paddingY: 0, paddingLeft: 2 }}
              dense
              disableGutters
            >
              <ListItemText id={labelId} primary={region.name} />
              {/* todo seconday bytton that also sets the looping to true */}
              {/* todo on region hover also show a repeat buttong that can be instalntly presseed that both selects and sets repeat on a reigon */}
            </ListItemButton>
          </ListItem>
        );
      })}
    </List>
  );

  return (
    <Box
      sx={{
        // height: "100%",
        // boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      {regionsList}
      <Button
        variant="outlined"
        endIcon={<EditIcon />}
        onClick={handeEditRegionsClick}
        size="small"
        // sx={{ width: "fit-content" }}
      >
        <Typography variant="secondary">EDIT REGIONS</Typography>
      </Button>
    </Box>
  );
};
