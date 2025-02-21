import React from "react";
import ReactDOM from "react-dom/client";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { theme, globalStyles } from "./config/mui";
import { Provider } from "react-redux";
import { RouterProvider } from "react-router-dom";
import { router } from "./routes/router";
import { store } from "./store";
import "./store/middleware/listeners";
import { RehydratedGate } from "./store/RehydratedGate";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <Provider store={store}>
      <ThemeProvider
        theme={theme}
        modeStorageKey="bt_mui-mode"
        colorSchemeStorageKey="bt_mui-color-scheme"
        // idk if its broken rn, but in theme.ts, we need colorSchemeSelector "data" or "class" if we want to manualy force a dark or light theme here.
        defaultMode={"system"}
      >
        <CssBaseline />
        <GlobalStyles styles={(theme) => globalStyles(theme)} />
        <RehydratedGate>
          <RouterProvider router={router} />
        </RehydratedGate>
      </ThemeProvider>
    </Provider>
  </React.StrictMode>
);
