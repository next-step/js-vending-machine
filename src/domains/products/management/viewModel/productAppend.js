/* eslint-disable no-alert */
import productStore from '../../../../store/productsStore';
import ProductItem from '../components/ProductItem';
import DIVIDABLE_NUMBER from '../constants/constants';
import {
  TYPE_DIVIDABLE_PRICE,
  TYPE_INPUT,
  TYPE_PRODUCT_NAME,
} from '../constants/message';

const isValidateInput = (name, price, quantity) => {
  if (!(name && price && quantity)) {
    alert(TYPE_INPUT);
    return false;
  }

  if (name.trim() === '') {
    alert(TYPE_PRODUCT_NAME);
    return false;
  }

  if (price % DIVIDABLE_NUMBER !== 0) {
    alert(TYPE_DIVIDABLE_PRICE);
    return false;
  }

  return true;
};

const setProduct = (e) => {
  const name = e.target.querySelector('#product-name-input').value;
  const price = e.target.querySelector('#product-price-input').value;
  const quantity = e.target.querySelector('#product-quantity-input').value;

  if (!isValidateInput(name, price, quantity)) return false;

  const product = { name, price, quantity };

  productStore.SET_PRODUCTS(product);

  return true;
};

const makeProductRows = () => {
  const products = productStore.GET_PRODUCTS();
  const template = document.createElement('template');
  const rows = products.map((product) => {
    const item = product.getProduct();

    return ProductItem(item.name, item.price, item.quantity);
  });

  template.innerHTML = rows.join('');

  document
    .querySelector('#product-inventory-container')
    .replaceChildren(template.content);
};

const init = () => {
  makeProductRows();
};

const reset = (target) => {
  target.reset();
};

const productAppend = () => {
  init();

  const $productContainer = document.querySelector('.product-container');

  $productContainer.addEventListener('submit', (e) => {
    e.preventDefault();

    if (setProduct(e)) {
      makeProductRows();
      reset($productContainer);
    }
  });
};

export default productAppend;
