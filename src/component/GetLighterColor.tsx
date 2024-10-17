export const getLighterColor = (color: string, opacity: number) => {
  const hexToRgb = (hex: string) => {
    const bigint = parseInt(hex.slice(1), 16);
    const r = (bigint >> 16) & 255;
    const g = (bigint >> 8) & 255;
    const b = bigint & 255;
    return {r, g, b};
  };

  const {r, g, b} = hexToRgb(color);
  const lighterColor = `rgba(${r}, ${g}, ${b}, ${opacity})`;
  return lighterColor;
};
