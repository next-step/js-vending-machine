import RegisterProduct from './RegisterProduct.js';
import ProductsInventory from './ProductsInventory.js';

export default function ManageProductsPage({ $target }) {
  this.$target = $target;

  const $page = document.createElement('section');
  $page.dataset.cy = 'manage-products';

  this.render = () => {
    this.$target.appendChild($page);
  };

  this.setState = () => {
    this.registerProduct.render();
    this.productsInventory.render();
  };

  this.registerProduct = new RegisterProduct({
    $target: $page,
  });

  this.productsInventory = new ProductsInventory({
    $target: $page,
  });
}
