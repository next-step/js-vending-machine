export const binders ={
  productContainerBinder: null,
  productInventoryContainerBinder: null,
};

export function render(binderName) {
  binders[binderName]?.();
}
