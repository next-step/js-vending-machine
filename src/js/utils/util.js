/**
 * @param {any} item - 깊은 복사의 대상.
 */
export const deepCopy = (item) => JSON.parse(JSON.stringify(item));

/**
 * @param {string} prop - localStorage 에 저장할 item 이름
 * @param {any} value - localStorage 에 저장할 item value
 */
export const setLocalStorage = (prop, value) => window.localStorage.setItem(prop, JSON.stringify(value));

/**
 * @param {string} prop - localStorage 에 저장된 item 이름
 */
export const getLocalStorage = (prop) => JSON.parse(window.localStorage.getItem(prop));

/**
 * @param {Object} object - length 를 구하기 위한 대상 object
 */
export const getObjectLength = (object) => Object.keys(object ?? {}).length ?? 0;