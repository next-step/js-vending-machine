import { NoDataError } from '../utils/errorValidation';
import { ERROR } from '../config/message';

export const setItem = (key: string, value: Record<string, unknown>) => {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (err) {
    console.log(err);
  }
};

export const getItem = <T extends Record<string, unknown>>(key: string): T => {
  const json = localStorage.getItem(key);
  if (json === null) throw new NoDataError(ERROR.NO_STORAGE_ITEM);
  return JSON.parse(json);
};
