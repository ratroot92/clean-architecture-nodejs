module.exports = function normalizeNumber(val, max, min) {
  return (val - min) / (max - min);
};
