export function arrayIfTrue<T>(value: T, condition: boolean): T[] {
  if (condition) {
    return [value];
  }
  return [];
}

export function key<T>(
  lookupFunction: (obj: T) => string | number,
  source: T[]
) {
  const outMap = new Map<string | number, T[]>();
  source.forEach((ele) => {
    const key = lookupFunction(ele);
    if (!outMap.has(key)) {
      outMap.set(key, []);
    }
    // @ts-expect-error there is a check to create if it does not exist on the line above
    outMap.get(key).push(ele);
  });

  return outMap;
}
