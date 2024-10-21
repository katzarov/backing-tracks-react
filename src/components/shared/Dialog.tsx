import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import { FC } from "react";

interface IDialogProps extends DialogProps {
  disableClose?: boolean;
}

export const Dialog: FC<IDialogProps> = ({
  children,
  disableClose = false,
  onClose,
  ...restOfProps
}) => {
  return (
    <MuiDialog
      disableEscapeKeyDown={disableClose}
      onClose={disableClose ? undefined : onClose}
      {...restOfProps}
    >
      {children}
    </MuiDialog>
  );
};
