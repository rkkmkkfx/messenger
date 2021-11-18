export { default as getFormValues } from './getFormValues';

export const isObject = (value: any): boolean => value != null && typeof value === 'object';

const isArray = (value: any): boolean => Array.isArray(value);

export const hasKey = <T extends Record<string, unknown>>(obj: T, k: keyof any): k is keyof T => k in obj;

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
    const areArrays = isArray(firstValue) && isArray(secondValue);
    if (((areObjects || areArrays) && !objectsAreEqual(firstValue, secondValue))
      || (!areObjects && firstValue !== secondValue)) {
      return false;
    }
  }
  return true;
}
