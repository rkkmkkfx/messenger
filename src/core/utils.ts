export const isObject = (value: any): boolean => value != null && typeof value === 'object';

export function objectsAreEqual(first: Record<string, any>, second: Record<string, any>): boolean {
  const firstObjectKeys = Object.keys(first);
  const secondObjectKeys = Object.keys(second);

  if (firstObjectKeys.length !== secondObjectKeys.length) {
    return false;
  }

  for (let i = 0; i < firstObjectKeys.length; i++) {
    const key = firstObjectKeys[i];
    const firstValue = first[key];
    const secondValue = second[key];
    const areObjects = isObject(firstValue) && isObject(secondValue);
    if ((areObjects && !objectsAreEqual(firstValue, secondValue))
      || (!areObjects && firstValue !== secondValue)) {
      return false;
    }
  }
  return true;
}
