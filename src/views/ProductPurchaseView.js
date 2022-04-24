import { productPurchaseTabTemplate } from '../templates/index.js';

import { $ } from '../utils/dom.js';

const ProductPurchaseView = {
  render: () => {
    $('main').innerHTML = productPurchaseTabTemplate();
  },
};

export default ProductPurchaseView;
