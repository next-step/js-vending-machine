import { STORE_KEY } from '../../constants/store/index.js';
import { validateProduct } from '../../service/productManagement/error.js';
import { getProductListTemplate, getProductsTemplate } from '../../template/productManagement/index.js';
import { Component } from '../common.js';

class ProductManagement extends Component {
  constructor($props) {
    const productsTemplate = getProductsTemplate();
    super(productsTemplate);

    this.$props = $props;
  }

  handleRemoveAllProduct = () => {
    const { store } = this.$props;
    store.reset();
    super.render();
  };

  handleSubmitProduct = (e) => {
    e.preventDefault();

    const name = e.target['product-name-input'].value;
    const price = Number(e.target['product-price-input'].value);
    const quantity = Number(e.target['product-quantity-input'].value);

    this.setProductsState({ name, price, quantity });
    this.updateView();
    e.target.reset();
  };

  setProductsState(product) {
    const { store } = this.$props;
    try {
      validateProduct(product);

      const products = store.state.productManagement ?? [];
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
    } catch (err) {
      alert(err.message);
    }
  }

  setEvent() {
    document.querySelector('.product-container').addEventListener('submit', this.handleSubmitProduct);
    document.getElementById('product-all-remove-button').addEventListener('click', this.handleRemoveAllProduct);
  }

  updateView = () => {
    const { store } = this.$props;
    const productManagement = store.state[STORE_KEY.PRODUCT_MANAGEMENT];

    document.getElementById('product-inventory-container').innerHTML = getProductListTemplate(productManagement);
  };
}

export default ProductManagement;
