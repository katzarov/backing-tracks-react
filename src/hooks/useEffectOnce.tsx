import { EffectCallback, useEffect, useRef } from "react";

/**
 * For use mainly with side effects that we do on the URL. (Likely will delete this hook as we won't be able to reuse it in all scenarios)
 * During the auth flow, we strip params from the URL, and when the effect is ran a second time because of strict mode, it won't work.
 *
 * Alternatively I can modify the auth code to write back to the url upon a successful retrieval of the code, and next call we can check the url for a new param that conveys whether code is already extracted.
 */
export const useEffectOnce = (effect: EffectCallback) => {
  const effectHasRun = useRef(false);

  return useEffect(() => {
    if (effectHasRun.current) return;

    const cleanup = effect();
    effectHasRun.current = true;
    return cleanup;
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
};
