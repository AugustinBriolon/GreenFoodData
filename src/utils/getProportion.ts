export const getProportion = (value: number, portion: number) => {
  if (Number.isNaN(portion)) {
    return 0;
  } else {
    return ((value * portion) / 100).toFixed(1)
  }
}