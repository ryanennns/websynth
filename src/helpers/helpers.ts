export const clampBetween = (min: number, max: number, val: number) =>
  Math.max(min, Math.min(max, val));
