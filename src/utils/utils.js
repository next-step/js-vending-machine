export function entryObject(o) {
  if (typeof o !== 'object') throw new Error('only Object can entry in entryObject function');

  return Object.entries(o);
}
