export const removeAllChild = (parentNode) => {
  while (parentNode.hasChildNodes()) {
    parentNode.removeChild(parentNode.firstChild);
  }
};
