import { Dialog as MuiDialog, DialogProps } from "@mui/material";
import { FC } from "react";

interface IDialogProps extends Omit<DialogProps, "disableEscapeKeyDown"> {
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
      {...restOfProps}
      disableEscapeKeyDown={disableClose}
      onClose={disableClose ? undefined : onClose}
    >
      {children}
    </MuiDialog>
  );
};
