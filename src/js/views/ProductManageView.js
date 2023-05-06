import {$} from '../utils/dom.js';
import SELECTOR from '../constants/selector.js';
import { productAddFormTemplate, productTableTemplate, createProductTableBodyTemplate } from '../templates/productAddMenuTemplate.js';

class ProductManageView {
  render() {
    $(`#${SELECTOR.tabContentContainerId}`).innerHTML = productAddFormTemplate + productTableTemplate;
  }

  renderTableWithProductItems(products) {
    $(`#${SELECTOR.productInventoryContainer}`).innerHTML =
    createProductTableBodyTemplate(products);
  }
  
  resetProductItemInputs() {
    $(`#${SELECTOR.productNameInputId}`).value = null;
    $(`#${SELECTOR.productPriceInputId}`).value = null;
    $(`#${SELECTOR.productQuantityInputId}`).value = null;
  }
}

export default ProductManageView;