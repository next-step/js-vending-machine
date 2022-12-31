import { ALERT } from '../../constants/alert.js';
import { STORAGE } from '../../constants/storage.js';
import { VALIDATE } from '../../constants/validate.js';
import storage from '../../js/utils/storage.js';
import './add-product-input.js';

const template = document.createElement('template');
template.innerHTML = /* html */ `
    <link rel="stylesheet" href="/src/css/index.css">
    <div id="appending-product-container" class="contents-container">
      <h3>상품 추가하기</h3>
      <add-product-input></add-product-input>
      <table class="product-inventory">
        <colgroup>
          <col style="width: 140px" />
          <col style="width: 100px" />
          <col style="width: 100px" />
        </colgroup>
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody id="product-inventory-container"></tbody>
      </table>
    </div>
`;

class ProductManage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
    this.products = [];
  }

  connectedCallback() {
    const storedList = storage.getStorage({ id: STORAGE.KEY });

    if (storedList && storedList.products) {
      this.products = storedList.products;
    }

    this.root.appendChild(template.content.cloneNode(true));
    this.$inventoryContainer = this.root.querySelector('#product-inventory-container');
    this.$productInputWrapper = this.root.querySelector('add-product-input');

    this.$productInputWrapper.addEventListener('onSubmit', (e) => {
      this.addProduct(e);
    });

    this.render();
  }

  validateQuantity = ({ quantity }) => {
    return quantity > 0;
  };

  validatePrice = ({ price }) => {
    const isValidPrice = price % VALIDATE.MIN_UNIT === 0 && price >= VALIDATE.MIN_PRICE;

    if (!isValidPrice) alert(ALERT.PRICE_VALIDATION);

    return isValidPrice;
  };

  checkSameProduct = ({ products, typedProduct }) => {
    const isExist = products.findIndex((product) => product.name === typedProduct.name) > -1;

    if (isExist) {
      return products.map((product) => (product.name === typedProduct.name ? typedProduct : product));
    }

    return [...products, typedProduct];
  };

  addProduct(e) {
    const { name, price, quantity } = e.detail;

    if (!this.validatePrice({ price }) || !this.validateQuantity({ quantity })) return;

    this.products = this.checkSameProduct({ products: this.products, typedProduct: { name, price, quantity } });
    this.render();
  }

  disconnectedCallback() {
    const storedValue = storage.getStorage({ id: STORAGE.KEY });
    storage.setStorage({ id: STORAGE.KEY, value: { ...storedValue, products: this.products } });
  }

  render() {
    if (!this.products.length) return;

    this.$inventoryContainer.innerHTML = /* html */ `
      ${this.products
        .map(({ name, price, quantity }) => {
          return `
          <tr class=".product-inventory-list">
            <td>${name}</td>
            <td>${price}</td>
            <td>${quantity}</td>
          </tr>
        `;
        })
        .join('')}
      `;
  }
}

window.customElements.define('product-manage', ProductManage);
