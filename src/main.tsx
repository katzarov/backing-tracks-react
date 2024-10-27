import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { globalStyles, theme } from "./config/theme";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { store } from "./store";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider
      theme={theme}
      modeStorageKey="bt_mui-mode"
      colorSchemeStorageKey="bt_mui-color-scheme"
      defaultMode={"system"}
    >
      <CssBaseline />
      <GlobalStyles styles={(theme) => globalStyles(theme)} />
      <Provider store={store}>
        <RouterProvider router={router} />
      </Provider>
    </ThemeProvider>
  </React.StrictMode>
);
