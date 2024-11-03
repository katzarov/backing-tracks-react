import { FC, PropsWithChildren } from "react";
import { useAppSelector } from "./store";
import { selectAppRehydrated } from "./slices/app/slice";

/**
 * Make sure store is rehydrated before rendering app.
 *
 * In practice, it is always rehydrated at this point and null is never rendered.
 * By the time we get here state is already rehydrated (or at least in this case - we are reading from local storage, which is synchronous)
 */
export const RehydratedGate: FC<PropsWithChildren> = ({ children }) => {
  const isAppRehydrated = useAppSelector(selectAppRehydrated);

  return isAppRehydrated ? children : null;
};
