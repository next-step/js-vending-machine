import { ERROR_MESSAGE } from '../constants/index.js';

export const createPurchasableRowArray = (product, index) => [
  ...Object.values(product)
    .slice(1)
    .map((item) => `<th>${item}</th>`),
  '<th data-testid="purchaseButton"><button>구매하기</button></th>',
];

export const validatePurchasable = (chargedAmount, product) => {
  if (chargedAmount < product.price) throw Error(ERROR_MESSAGE.LACK_MONEY);
  if (product.quantity <= 0) throw Error(ERROR_MESSAGE.LACK_PRODUCT_QUANTITY);
};
