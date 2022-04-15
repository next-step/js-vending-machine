import { STORE_KEY } from '../../constants/store/index.js';
import { validateProduct } from '../../service/productManagement/error.js';
import store from '../../store/index.js';
import { getProductsTemplate } from '../../template/productManagement/index.js';
import { headerActive, printAlert } from '../common.js';

class ProductManagement {
  constructor() {
    this.render();
  }

  handleSubmitProduct = (e) => {
    e.preventDefault();

    const name = e.target['product-name-input'].value;
    const price = Number(e.target['product-price-input'].value);
    const quantity = Number(e.target['product-quantity-input'].value);

    this.setProductsState({ name, price, quantity });
    this.render();
  };

  setProductsState(product) {
    const { errorMessage } = validateProduct(product);
    if (errorMessage) {
      printAlert(errorMessage);
      return;
    }

    const products = store.getState().productManagement ?? [];
    const duplicatedProductIndex = products.findIndex((productItem) => productItem.name === product.name);
    if (duplicatedProductIndex > -1) {
      products[duplicatedProductIndex] = product;
    } else {
      products.push(product);
    }

    store.setState({
      key: STORE_KEY.PRODUCT_MANAGEMENT,
      value: [...products],
    });
  }

  setEvent() {
    document.querySelector('.product-container').addEventListener('submit', this.handleSubmitProduct);
  }

  render() {
    headerActive(document.getElementById('product-manage-menu'));
    document.getElementById('app').innerHTML = getProductsTemplate();
    this.setEvent();
  }
}

export default ProductManagement;
