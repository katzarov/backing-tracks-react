import { FC } from "react";
import { Alert as MuiAlert } from "@mui/material";

interface IAlertProps {
  message: string;
  severity: "info" | "success" | "warning" | "error";
}

export const Alert: FC<IAlertProps> = ({ message, severity }) => {
  return (
    <MuiAlert variant="filled" severity={severity}>
      {message}
    </MuiAlert>
  );
};
