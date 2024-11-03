import { createListenerMiddleware, addListener } from "@reduxjs/toolkit";
import type { AppState, AppDispatch } from "../store";

export class ListenerMiddlewareWithAppTypes {
  static listenerMiddleware;

  static {
    this.listenerMiddleware = createListenerMiddleware();
  }

  static startListening = this.listenerMiddleware.startListening.withTypes<
    AppState,
    AppDispatch
  >();

  static addListener = addListener.withTypes<AppState, AppDispatch>();
}
