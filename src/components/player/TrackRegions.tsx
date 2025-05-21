import EditIcon from "@mui/icons-material/Edit";
import { Box, ToggleButton } from "@mui/material";
import { useAppDispatch, useAppSelector } from "@src/store";
import {
  selectIsEditingRegions,
  setIsEditingRegions,
} from "@src/store/slices/player";

export const TrackRegions = () => {
  const isEditingRegions = useAppSelector(selectIsEditingRegions);
  const dispatch = useAppDispatch();

  return (
    <Box
      sx={{
        height: "100%",
        boxSizing: "border-box",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-start",
      }}
    >
      <ToggleButton
        value="check"
        selected={isEditingRegions}
        size="small"
        sx={{ width: "fit-content" }}
        onChange={() => dispatch(setIsEditingRegions(!isEditingRegions))}
      >
        <EditIcon />
      </ToggleButton>
    </Box>
  );
};
