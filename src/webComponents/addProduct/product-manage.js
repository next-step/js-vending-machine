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
    this.root.appendChild(template.content.cloneNode(true));
    this.$inventoryContainer = this.root.querySelector('#product-inventory-container');
    this.$inputs = this.root.querySelector('add-product-input');

    this.$inputs.addEventListener('onSubmit', (e) => {
      this.addProduct(e);
    });

    this.render();
  }

  addProduct(e) {
    const { name, price, quantity } = e.detail;
    this.products.push({ name, price, quantity });
    this.render();
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
