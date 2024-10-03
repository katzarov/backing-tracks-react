import { PropsWithChildren, FC, ReactElement } from "react";
import { render } from "@testing-library/react";
import type { RenderOptions } from "@testing-library/react";
import { Provider } from "react-redux";
import { MemoryRouter } from "react-router-dom";

import { createStore } from "src/store";
import type { AppStore, AppState } from "src/store";

interface ExtendedRenderOptions extends Omit<RenderOptions, "queries"> {
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
        <MemoryRouter>{children}</MemoryRouter>
      </Provider>
    );
  };
  return {
    store,
    ...render(component, { wrapper: Wrapper, ...renderOptions }),
  };
};
