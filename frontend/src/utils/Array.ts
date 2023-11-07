export function arrayIfTrue<T>(value: T, condition: boolean): T[] {
  if (condition) {
    return [value];
  }
  return [];
}
