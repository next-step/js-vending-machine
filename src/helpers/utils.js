import { ERROR_MESSAGE } from '../constants.js';

// prettier-ignore
export const pipe = (...fns) => value => fns.reduce((_value, fn) => fn(_value), value);

export const pipeline = (execute, params) => {
  try {
    return execute(params);
  } catch (error) {
    alert(error.message);
    return null;
  }
};

export const trim = value => {
  if (typeof value !== 'string') throw new ReferenceError(ERROR_MESSAGE.INVALID_TYPE);

  return value.trim();
};

export const getType = target => {
  const OBJECT_CONSTRUCTOR_START_INDEX = 8;

  if (target == null) return 'null';

  const targetType = typeof target;
  if (targetType !== 'object') return targetType;

  let clazz = Object.prototype.toString.apply(target);
  clazz = clazz.substring(OBJECT_CONSTRUCTOR_START_INDEX, clazz.length - 1);

  if (clazz !== 'Object') return clazz;
  if (clazz.constructor == 'Object') return clazz;

  const targetConstructor = target.constructor.toString();
  const startIndex = targetConstructor.indexOf('(');
  return targetConstructor.substring(OBJECT_CONSTRUCTOR_START_INDEX + 1, startIndex);
};
