import { DEFAULT_PRICE_UNIT } from '../util/consts.js';

const Validator = {
  product: {
    isEmpty(...info) {
      return info.some((e) => e === '' || e === undefined);
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
};

export default Validator;
