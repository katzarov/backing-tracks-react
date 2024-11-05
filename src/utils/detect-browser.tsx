declare global {
  interface Window {
    ApplePaySetup?: unknown;
  }
}

export const isSafari = typeof window.ApplePaySetup !== "undefined";
