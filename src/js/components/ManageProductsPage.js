import AddProduct from './AddProduct.js';
import ProductsList from './ProductsList.js';
import store from '../store/store.js';

export default function ManageProductsPage({ $target }) {
  this.$target = $target;

  const $page = document.createElement('section');
  $page.dataset.cy = 'manage-products';

  this.render = () => {
    this.$target.appendChild($page);
  };

  this.setState = () => {
    const newState = store.getState().products;
    this.productsList.setState(newState);
  };

  this.addProduct = new AddProduct({
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

  this.productsList = new ProductsList({
    $target: $page,
    state: store.getState().products,
  });
}
