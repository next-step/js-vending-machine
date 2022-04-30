import { DEFAULT_PRICE_UNIT } from '../util/consts.js';

const Validator = {
  product: {
    isEmpty(...info) {
      return info.some((e) => e?.trim() === '' || e?.trim() === undefined);
    },
    isNotPriceTenUnit(price) {
      return price % DEFAULT_PRICE_UNIT !== 0;
    },
    isNotOverTen(price) {
      return price < DEFAULT_PRICE_UNIT;
    },
    includesProduct(productList, currProduct) {
      return productList.some(
        (prevProduct) => prevProduct.name === currProduct.name
      );
    },
  },

  storage: {
    isEmpty(storageProduct) {
      return storageProduct === null;
    },
    isSameName(storageProduct, newProduct) {
      return storageProduct.some(
        (prevProduct) => prevProduct.name === newProduct.name
      );
    },
  },
};

export default Validator;
