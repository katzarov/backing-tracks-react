import { Driver, Options } from "redux-remember";

interface IReduxRememberConfig {
  driver: Driver;
  persistedKeys: string[];
  options?: Partial<Options>;
}

export const reduxRememberConfig: IReduxRememberConfig = {
  driver: window.localStorage,
  persistedKeys: ["player"],
  options: {
    prefix: "bt_persisted_",
  },
};
