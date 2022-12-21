function isObject(something) {
  return typeof something === 'object';
}

/**
 *
 * @param {Object} object
 */
function cloneDeepObject(object) {
  const keys = Object.keys(object);
  return Object.freeze(
    keys.reduce((result, key) => {
      const value = object[key];
      if (Array.isArray(value)) {
        return { ...result, [key]: [...value] };
      }
      if (typeof value === 'object') {
        return { ...result, [key]: Object.freeze({ ...cloneDeepObject(value) }) };
      }
      return { ...result, [key]: value };
    }, {})
  );
}

/**
 *
 * @param {[]} array
 */
function cloneDeepArray(array) {
  return array.reduce((result, item) => {
    if (Array.isArray(item)) {
      return [...result, ...cloneDeepArray(item)];
    }
    if (typeof value === 'object') {
      return [...result, cloneDeepObject(item)];
    }
    return [...result, item];
  }, []);
}

/**
 *
 * @param {Object|[]} something
 */
export function cloneDeep(something) {
  if (Array.isArray(something)) {
    return cloneDeepArray(something);
  }
  if (isObject(something)) {
    return cloneDeepObject(something);
  }
  return something;
}
