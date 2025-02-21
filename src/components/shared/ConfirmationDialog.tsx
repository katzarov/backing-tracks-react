import { FC, PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { Dialog } from "./Dialog";

interface IConfirmationDialogProps extends PropsWithChildren {
  title: string;
  negativeButtonText: string;
  affirmativeButtonText: string;
  disableAffirmativeButton?: boolean;
  affirmativeActionLoading?: boolean;
  childrenLoading?: boolean;
  open: boolean;
  onCloseNegative: () => void;
  onCloseAffirmative: () => void;
}

export const ConfirmationDialog: FC<IConfirmationDialogProps> = ({
  children,
  title,
  negativeButtonText,
  affirmativeButtonText,
  disableAffirmativeButton = false,
  affirmativeActionLoading = false,
  childrenLoading = false,
  open,
  onCloseNegative,
  onCloseAffirmative,
}) => {
  const shouldDisableActions = childrenLoading || affirmativeActionLoading;

  // todo min width/height
  return (
    <Dialog
      open={open}
      disableClose={shouldDisableActions}
      onClose={onCloseNegative}
    >
      <DialogTitle>{title}</DialogTitle>
      <DialogContent>
        {typeof children === "string" ? (
          <DialogContentText>{children}</DialogContentText>
        ) : (
          children
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={shouldDisableActions} onClick={onCloseNegative}>
          {negativeButtonText}
        </Button>
        <Button
          loading={affirmativeActionLoading}
          loadingPosition="end"
          disabled={shouldDisableActions || disableAffirmativeButton}
          onClick={onCloseAffirmative}
          autoFocus
        >
          {affirmativeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
