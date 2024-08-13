import { FC } from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

// TODO handle passing react comps and not just text
interface IAlertDialogProps {
  title: string;
  textContent: string;
  negativeButtonText: string;
  affirmativeButtonText: string;
  open: boolean;
  showSpinner: boolean;
  onCloseNegative: () => void;
  onCloseAffirmative: () => void;
}

export const AlertDialog: FC<IAlertDialogProps> = ({
  title,
  textContent,
  negativeButtonText,
  affirmativeButtonText,
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
        <DialogContentText id="alert-dialog-description">
          {textContent}
        </DialogContentText>
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
          disabled={shouldDisableActions}
          onClick={onCloseAffirmative}
          autoFocus
        >
          {affirmativeButtonText}
        </Button>
      </DialogActions>
    </Dialog>
  );
};
