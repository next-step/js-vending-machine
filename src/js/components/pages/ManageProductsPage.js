import AddProduct from '../AddProduct.js';
import ProductsList from '../ProductsList.js';
import { setItem, getItem } from '../../utils/Storage.js';

export default function ManageProductsPage({ $target }) {
  this.$target = $target;
  this.state = getItem('state');

  const $page = document.createElement('section');
  $page.dataset.cy = 'manage-products';

  this.render = () => {
    this.$target.appendChild($page);
  };

  this.setState = newState => {
    this.state = newState;
    this.productsList.setState(this.state.products);
  };

  this.addProduct = new AddProduct({
    $target: $page,
    onSubmit: (name, price, quantity) => {
      const index = this.state.products.findIndex($el => $el.name === name);
      let newState = {};

      if (index > -1) {
        const nextState = { ...this.state };
        nextState.products[index] = { name, price, quantity };
        newState = { ...nextState };
      } else {
        newState = {
          ...this.state,
          products: [...this.state.products, { name, price, quantity }],
        };
      }

      setItem('state', newState);
      this.setState(newState);
    },
  });

  this.productsList = new ProductsList({
    $target: $page,
    state: this.state.products,
  });
}
