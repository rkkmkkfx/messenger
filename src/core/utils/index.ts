export { default as getFormValues } from './getFormValues';

export const hasKey = <T extends Record<string, unknown>>(obj: T, k: keyof any): k is keyof T => k in obj;

const isObject = (value: unknown): boolean => Object.prototype.toString.call(value) === '[object Object]'
  || Array.isArray(value);

export function isEqual(first: Record<string, any>, second: Record<string, any>): boolean {
  if (!isObject(first) || !isObject(second) || !first || !second) {
    return false;
  }

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
    if ((areObjects && !isEqual(firstValue, secondValue))
      || (!areObjects && firstValue !== secondValue)) {
      return false;
    }
  }
  return true;
}
