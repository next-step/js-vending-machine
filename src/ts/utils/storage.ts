import { ValidationError } from './errorValidation';
import { ERROR } from './message';

export function setItem(key: string, value: Object): void {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
}

export function getItem<T extends Object>(key: string): T {
  try {
    const json = localStorage.getItem(key);
    if (json === null) throw new ValidationError(ERROR.NO_STORAGE_ITEM);
    const stored: T = JSON.parse(json);
    return stored;
  } catch (err) {
    throw err;
  }
}
