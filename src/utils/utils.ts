export const formatFromSeconds = (seconds: number) => {
  return [seconds / 60, seconds % 60]
    .map((v) => `0${Math.floor(v)}`.slice(-2))
    .join(":");
};

export const formatFromMilliSeconds = (milliSeconds: number) => {
  const seconds = milliSeconds / 1000;

  return formatFromSeconds(seconds);
};

export const getSymmetricDifference = <T extends number | string>(
  arr1: Array<T>,
  arr2: Array<T>
) => {
  // Set.prototype.symmetricDifference would have been sweet but I am not going to do polyfills
  return arr1
    .filter((x) => !arr2.includes(x))
    .concat(arr2.filter((x) => !arr1.includes(x)));
};

export const parseStringAsInt = (value: string | null | undefined) => {
  if (value === null || value === undefined) {
    return null;
  }

  const parsed = parseInt(value, 10);

  // check if the string value was gibberish and could not be parsed as an int. parseInt would return NaN
  if (isNaN(parsed)) {
    console.warn("Parsed value that should have been an int, is NOT", parsed);
    // TODO: probably want to throw and do something cause we could be in bad state
    return null;
  }

  return parsed;
};

export const convertIntToString = (value: number) => {
  return value.toString(10);
};
