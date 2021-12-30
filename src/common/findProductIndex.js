import store from '../store/index.js';

export const findProductIndex = (nextItems = {}) => {
  const { products } = store.getState();
  return products.findIndex(v => v.name === nextItems.name);
}

export default findProductIndex;