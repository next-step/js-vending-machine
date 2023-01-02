function isObject(something) {
  return typeof something === 'object';
}

/**
 *
 * @param {Object} object
 */
function cloneDeepObjectReadOnly(object) {
  const keys = Object.keys(object);
  return Object.freeze(
    keys.reduce((result, key) => {
      const value = object[key];
      if (Array.isArray(value)) {
        return { ...result, [key]: [...value] };
      }
      if (typeof value === 'object') {
        return { ...result, [key]: Object.freeze({ ...cloneDeepObjectReadOnly(value) }) };
      }
      return { ...result, [key]: value };
    }, {})
  );
}

/**
 *
 * @param {[]} array
 */
function cloneDeepArrayReadOnly(array) {
  return array.reduce((result, item) => {
    if (Array.isArray(item)) {
      return [...result, ...cloneDeepArrayReadOnly(item)];
    }
    if (typeof value === 'object') {
      return [...result, cloneDeepObjectReadOnly(item)];
    }
    return [...result, item];
  }, []);
}

/**
 *
 * @param {Object|[]} something
 */
export function cloneDeepReadOnly(something) {
  if (Array.isArray(something)) {
    return cloneDeepArrayReadOnly(something);
  }
  if (isObject(something)) {
    return cloneDeepObjectReadOnly(something);
  }
  return something;
}

/**
 *
 * @param {object} obj
 */
export function deepFreeze(obj) {
  // Retrieve the property names defined on object
  const propNames = Reflect.ownKeys(obj);

  // Freeze properties before freezing self
  for (const name of propNames) {
    const value = obj[name];

    if (['object', 'function'].includes((type) => typeof value === type)) {
      deepFreeze(value);
    }
  }

  return Object.freeze(obj);
}
