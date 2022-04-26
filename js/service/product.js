import { InputValidationError } from '../utils/validation.js';
import { MESSAGE, RANGE } from '../const/index.js';

const product = (prevProducts) => {
  const products = prevProducts;

  const add = (product) => {
    validateProductInfo(product);

    const registeredIdx = products.findIndex(({ name }) => name === product.name);
    registeredIdx > 0 ? replaceProduct(registeredIdx, product) : pushWithRegisterTime(product);

    return products.length; 
  };

  const getProducts = () => products.sort(({ registerTime: a }, { registerTime: b }) => b - a);

  const replaceProduct = (registeredIdx, product) => {
    products[registeredIdx] = {
      ...products[registeredIdx],
      ...product,
    }
  }

  const pushWithRegisterTime = (product) => {
    products.push({
        ...product,
        registerTime: Date.now()
      })
  }

  return {
    add,
    getProducts,
  }
}

const validateProductInfo = ({ price }) => {
  if (price % RANGE.PRICE_UNIT)
    InputValidationError.of('price', MESSAGE.PLZ_CHECK_PRICE_UNIT);
};

export default product;