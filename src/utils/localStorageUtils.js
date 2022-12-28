import { isNil } from "./utils.js";

export function getLocalStorageItem(key, itemCallback) {
  const item = window.localStorage.getItem(key);

  if (itemCallback && typeof itemCallback === 'function') { return itemCallback(item); }
  return item;
}

export function setLocalStorageItem(key, value) {
  if (isNil(value)) return;

  window.localStorage.setItem(key, value);
}

export function removeLocalStorageItem(key) {
  window.localStorage.removeItem(key);
}
