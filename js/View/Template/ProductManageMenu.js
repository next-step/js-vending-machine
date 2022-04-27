import { selector } from '../../util/consts.js';

class ProductManageMenu {
  mount() {
    selector('#app').innerHTML = String.raw`
      <h1>🧃 자판기 미션 🧃</h1>  
      <vending-machine-router></vending-machine-router>
      <product-dashboard></product-dashboard>
      <product-inventory></product-inventory>
    `;
  }

  static of() {
    return new ProductManageMenu();
  }
}

export default ProductManageMenu;
