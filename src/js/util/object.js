function isObject(something) {
  return typeof something === 'object';
}

/**
 *
 * @param {Object} object
 */
function cloneDeepObject(object) {
  const keys = Object.keys(object);
  return keys.reduce((result, key) => {
    const value = object[key];
    if (Array.isArray(value)) {
      return { ...result, [key]: [...value] };
    }
    if (typeof value === 'object') {
      return { ...result, [key]: Object.freeze({ ...cloneDeepObject(value) }) };
    }
    return { ...result, [key]: value };
  }, {});
}

/**
 *
 * @param {[]} array
 */
function cloneDeepArray(array) {
  return array.map(cloneDeep);
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
