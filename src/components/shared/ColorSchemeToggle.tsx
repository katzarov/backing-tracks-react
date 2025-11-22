import { FC } from "react";
import { ToggleButton, ToggleButtonGroup, useColorScheme } from "@mui/material";
import type { SupportedColorScheme } from "@mui/material/styles";
import BrightnessAutoIcon from "@mui/icons-material/BrightnessAuto";
import LightModeIcon from "@mui/icons-material/LightMode";
import DarkModeIcon from "@mui/icons-material/DarkMode";

export const ColorSchemeToggle: FC = () => {
  const { mode, setMode } = useColorScheme();

  const handleChange = (
    _event: React.MouseEvent<HTMLElement>,
    value: SupportedColorScheme
  ) => {
    setMode(value);
  };

  if (!mode) {
    return null;
  }

  return (
    <ToggleButtonGroup
      size="small"
      color="primary"
      value={mode}
      exclusive
      onChange={handleChange}
      aria-label="color-scheme"
    >
      <ToggleButton value="system">
        <BrightnessAutoIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="light">
        <LightModeIcon fontSize="small" />
      </ToggleButton>
      <ToggleButton value="dark">
        <DarkModeIcon fontSize="small" />
      </ToggleButton>
    </ToggleButtonGroup>
  );
};
