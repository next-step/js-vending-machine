import './add-product-input.js';

const template = /* html */ `
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
  }

  connectedCallback() {
    this.root.innerHTML = template;
  }
}

window.customElements.define('product-manage', ProductManage);
