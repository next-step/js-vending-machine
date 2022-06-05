import { $, $getElement } from '../../dom.js';

import AddProduct from './AddProduct.js';
import ShowProduct from './ShowProduct.js';
import store from '../../store/store.js';

export default function ProductManage(target) {
  const { products } = store.getState();
  render();
  function render() {
    target.appendChild($getElement(template()));
    const $addProductSection = $('#add-product-section');
    const $showProductSection = $('#show-product-section');

    AddProduct($addProductSection);
    ShowProduct($showProductSection, products);
  }

  function template() {
    return `
    <div>
        <section id="add-product-section"></section>
        <section id="show-product-section"></section>
    </div>
    `;
  }
}
