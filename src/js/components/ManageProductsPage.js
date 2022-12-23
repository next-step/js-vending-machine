import RegisterProduct from './RegisterProduct.js';
import ProductsInventory from './ProductsInventory.js';
import store from '../store/store.js';

export default function ManageProductsPage({ $target }) {
  this.$target = $target;

  const $page = document.createElement('section');
  $page.dataset.cy = 'manage-products';

  this.render = () => {
    this.$target.appendChild($page);
  };

  this.setState = () => {
    const newState = store.getState();
    this.productsInventory.setState(newState);
  };

  this.registerProduct = new RegisterProduct({
    $target: $page,
    onSubmit: (name, price, quantity) => {
      const index = store.getState().products.findIndex($el => $el.name === name);

      if (index > -1) {
        const newState = store.getState();
        newState.products[index] = { name, price, quantity };
        store.setState(newState);
      } else {
        store.setState({
          ...store.getState(),
          products: [...store.getState().products, { name, price, quantity }],
        });
      }

      this.setState();
    },
  });

  this.productsInventory = new ProductsInventory({
    $target: $page,
    state: store.getState(),
  });
}
