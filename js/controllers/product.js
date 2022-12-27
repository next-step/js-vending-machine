import { vendingMachine } from '../models/VendingMachine.js';
import { clearProductForm, renderProductList } from '../views/product.js';

export const addProduct = (productInfo) => {
  vendingMachine.setProduct(productInfo.name, productInfo);
  renderProductList(vendingMachine.getProduct());
  clearProductForm();
};
