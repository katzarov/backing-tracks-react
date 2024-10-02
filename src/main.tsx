import React from "react";
import ReactDOM from "react-dom/client";
import { Experimental_CssVarsProvider as CssVarsProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { globalStyles, theme } from "./config/theme";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <CssVarsProvider theme={theme} defaultMode={"system"}>
      <CssBaseline />
      <GlobalStyles styles={(theme) => globalStyles(theme)} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </CssVarsProvider>
  </React.StrictMode>
);
