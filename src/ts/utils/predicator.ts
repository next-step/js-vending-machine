export const isPredicatedElement = <T extends Element>(target: Element | null): target is T => {
  return target !== null;
};
