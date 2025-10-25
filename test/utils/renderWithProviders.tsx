import { PropsWithChildren, FC, ReactElement } from "react";
import { render } from "vitest-browser-react";
import type { ComponentRenderOptions } from "vitest-browser-react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";
import { ThemeProvider } from "@mui/material/styles";
import { CssBaseline, GlobalStyles } from "@mui/material";
import { theme, globalStyles } from "../../src/config/mui";

import { createStore } from "src/store";
import type { AppStore, AppState } from "src/store";

interface ExtendedRenderOptions
  extends Omit<ComponentRenderOptions, "queries"> {
  preloadedState?: Partial<AppState>;
  store?: AppStore;
}

export const renderWithProviders = (
  component: ReactElement,
  {
    preloadedState = {},
    // create a store instance if no store was passed in
    store = createStore(preloadedState),
    ...renderOptions
  }: ExtendedRenderOptions = {}
) => {
  const Wrapper: FC<PropsWithChildren> = ({ children }) => {
    return (
      <Provider store={store}>
        <ThemeProvider
          theme={theme}
          modeStorageKey="bt_mui-mode"
          colorSchemeStorageKey="bt_mui-color-scheme"
          defaultMode={"system"}
        >
          <CssBaseline />
          <GlobalStyles styles={(theme) => globalStyles(theme)} />
          <MemoryRouter>{children}</MemoryRouter>
        </ThemeProvider>
      </Provider>
    );
  };
  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
};
