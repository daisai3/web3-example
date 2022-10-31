export const formatNumber = (value) => {
  const _value = Number(value);
  if (_value < 1000) return _value.toFixed(2);
  if (_value < 1000000) return `${(_value / 1000).toFixed(1)}K`;
  if (_value < 1000000000) return `${(_value / 1000000).toFixed(1)}M`;
  return "0.0";
};
