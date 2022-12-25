/**
 *
 * @param {string} key
 * @param {Object|Object[]} data
 */
export function saveItem(key, data) {
  localStorage.setItem(key, JSON.stringify(data));
}

/**
 * @param {string} key
 * @returns {null|Object|Object[]}
 */
export function loadItem(key) {
  const stringified = localStorage.getItem(key);
  return stringified ? JSON.parse(stringified) : null;
}
