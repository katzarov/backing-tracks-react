export const formatFromSeconds = (seconds: number) => {
  return [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");
};

export const formatFromMilliSeconds = (milliSeconds: number) => {
  const seconds = milliSeconds / 1000;

  return formatFromSeconds(seconds);
};
