import { PRODUCT } from '../constants/constant.js';
import { vendingMachine } from '../index.js';
import { validate } from '../utils/validator.js';
import {
  productNameValidations,
  productPriceValidations,
  productQuantityValidations,
} from '../validations/validation.js';
import { clearProductForm, renderProductList } from '../views/product.js';

export const addProduct = (productInfo) => {
  vendingMachine.setProduct(productInfo.name, productInfo);
  renderProductList(vendingMachine.getProduct());
  clearProductForm();
};

export const handleFormProductSubmit = (event) => {
  event.preventDefault();
  const productForm = {
    name: event.target.elements[PRODUCT.NAME].value,
    price: event.target.elements[PRODUCT.PRICE].value,
    quantity: event.target.elements[PRODUCT.QUANTITY].value,
  };
  try {
    validate(productForm.name, productNameValidations);
    validate(productForm.price, productPriceValidations);
    validate(productForm.quantity, productQuantityValidations);

    addProduct({
      name: productForm.name,
      price: +productForm.price,
      quantity: +productForm.quantity,
    });
  } catch (err) {
    alert(err.message);
  }
};
