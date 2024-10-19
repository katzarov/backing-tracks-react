import { FC, PropsWithChildren } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

interface IAlertDialogProps extends PropsWithChildren {
  title: string;
  negativeButtonText: string;
  affirmativeButtonText: string;
  disableAffirmativeButton?: boolean;
  open: boolean;
  showSpinner: boolean;
  onCloseNegative: () => void;
  onCloseAffirmative: () => void;
}

export const AlertDialog: FC<IAlertDialogProps> = ({
  children,
  title,
  negativeButtonText,
  affirmativeButtonText,
  disableAffirmativeButton = false,
  open,
  showSpinner,
  onCloseNegative,
  onCloseAffirmative,
}) => {
  const shouldDisableActions = showSpinner;

  return (
    <Dialog
      open={open}
      disableEscapeKeyDown={shouldDisableActions}
      onClose={shouldDisableActions ? undefined : onCloseNegative}
      aria-labelledby="alert-dialog-title"
      aria-describedby="alert-dialog-description"
    >
      <DialogTitle id="alert-dialog-title">{title}</DialogTitle>
      <DialogContent>
        {typeof children === "string" ? (
          <DialogContentText id="alert-dialog-description">
            {children}
          </DialogContentText>
        ) : (
          children
        )}
        {showSpinner && (
          <Box
            sx={(theme) => ({
              display: "flex",
              justifyContent: "center",
              margin: theme.spacing(1),
            })}
          >
            <CircularProgress />
          </Box>
        )}
      </DialogContent>
      <DialogActions>
        <Button disabled={shouldDisableActions} onClick={onCloseNegative}>
          {negativeButtonText}
        </Button>
        <Button
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
