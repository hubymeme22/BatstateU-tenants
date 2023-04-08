export function parseNumber(num) {
  const numStr = num.toFixed(2);
  return numStr.endsWith('.00') ? numStr.slice(0, -3) : numStr;
}

export function parseObject(obj) {
  for (const key in obj) {
    obj[key] = Number(parseNumber(obj[key]));
  }
  return obj;
}
