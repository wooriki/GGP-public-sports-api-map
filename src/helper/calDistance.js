export const calDistance = (x1, y1, x2, y2) => {
  const dx = x2 - x1;
  const dy = y2 - y1;
  const distance = Math.sqrt(dx ** 2 + dy ** 2);
  return distance;
};
