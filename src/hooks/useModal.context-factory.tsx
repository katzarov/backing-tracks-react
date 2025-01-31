import {
  Consumer,
  Context,
  createContext,
  FC,
  PropsWithChildren,
  useContext,
} from "react";

import { IUseModalProps, IUseModalReturnType, useModal } from "./useModal";

export class ModalContextFactory {
  context: Context<IUseModalReturnType>;
  Provider: FC<PropsWithChildren<IUseModalProps>>;
  Consumer: Consumer<IUseModalReturnType>;

  constructor() {
    this.context = createContext<IUseModalReturnType>(null!);
    this.context.displayName = "ModalContext";
    this.Provider = this.getProvider();
    this.Consumer = this.getConsumer();
  }

  private getProvider() {
    const Provider: FC<PropsWithChildren<IUseModalProps>> = ({
      children,
      cbBeforeOpen,
    }) => {
      const useModalHook = useModal({
        cbBeforeOpen,
      });

      return (
        <this.context.Provider value={useModalHook}>
          {children}
        </this.context.Provider>
      );
    };
    return Provider;
  }

  private getConsumer() {
    return this.context.Consumer;
  }

  getUseModalContextHook() {
    // when debugging, e.g. in "Components" tab, name of custom hook will be "ModalContext"
    const useModalContext = () => {
      return useContext(this.context);
    };

    return useModalContext;
  }
}
