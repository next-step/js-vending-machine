export function entryObject(o) {
  if (typeof o !== 'object') throw new Error('only Object can entry in entryObject function');

  return Object.entries(o);
}

export function isNil(target) {
  return typeof target === 'undefined' || target === null;
}

export function toNumber(target, fallback) {
  const numberedTarget = Number(target);
  if (Number.isNaN(numberedTarget)) return fallback || 0;

  return numberedTarget;
}
