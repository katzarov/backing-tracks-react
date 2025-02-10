import { Button, ButtonProps, CircularProgress } from "@mui/material";
import { FC } from "react";

interface IButtonWithLoadingSpinnerProps extends ButtonProps {
  showLoadingSpinner: boolean;
}

/**
 *
 * @deprecated TODO MUI 6.4 introduces loading states to buttons... remove this, and read what else has been recently introduced
 */
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
