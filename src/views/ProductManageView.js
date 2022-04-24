import { productTemplate, productManageTabTemplate } from '../templates/index.js';

import { SELECTOR } from '../constants.js';
import { $ } from '../utils/dom.js';

const ProductManageView = {
  render: () => {
    $('main').innerHTML = productManageTabTemplate();
  },
  renderProductTable: products => {
    $(`#${SELECTOR.PRODUCT_INVENTORY_CONTAINER_ID}`).innerHTML = products
      .map(({ name, price, quantity }) => productTemplate({ name, price, quantity }))
      .join('');
  },
  resetProductForm: () => {
    $(`#${SELECTOR.PRODUCT_NAME_INPUT_ID}`).value = '';
    $(`#${SELECTOR.PRODUCT_PRICE_INPUT_ID}`).value = '';
    $(`#${SELECTOR.PRODUCT_QUANTITY_INPUT_ID}`).value = '';
  },
};

export default ProductManageView;
