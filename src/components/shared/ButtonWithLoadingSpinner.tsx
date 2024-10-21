import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";

interface IButtonWithLoadingSpinnerProps extends ButtonProps {
  showLoadingSpinner: boolean;
}

export const ButtonWithLoadingSpinner: FC<IButtonWithLoadingSpinnerProps> = ({
  showLoadingSpinner,
  children,
  ...restOfProps
}) => {
  return (
    <Button {...restOfProps}>
      {showLoadingSpinner ? (
        <CircularProgress size="1rem" thickness={8} />
      ) : (
        children
      )}
    </Button>
  );
};
