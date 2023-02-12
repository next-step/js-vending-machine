import { getItem } from '../utils/Storage.js';
import { subject } from '../../../index.js';

customElements.define(
  'product-list',
  class extends HTMLElement {
    constructor() {
      super();
      this.shadow = this.attachShadow({ mode: 'open' });
      this.template = document.createElement('template');
      this.state = getItem('state').products;
      subject.subscribe(this);
    }

    connectedCallback() {
      this.initHtml();
      this.render();
    }

    setState() {
      this.state = getItem('state').products;
      this.render();
    }

    render() {
      const productListHTML = this.state
        .map(
          ({ name, price, quantity }) =>
            `<tr>
              <td>${name}</td>
              <td>${price.toLocaleString('ko-KR')}</td>
              <td>${quantity.toLocaleString('ko-KR')}</td>
            </tr>`,
        )
        .join('');

      const $tbody = this.shadow.querySelector('#product-inventory-container');
      $tbody.innerHTML = productListHTML;
    }

    initHtml() {
      this.template.innerHTML = `
				<link rel="stylesheet" href="./src/css/index.css" />
        <h3>상품 리스트</h3>
        <table data-cy="products-inventory" class="product-inventory pressed">
          <thead>
            <tr>
              <th>상품명</th>
              <th>가격</th>
              <th>수량</th>
            </tr>
          </thead>
          <tbody id="product-inventory-container"></tbody>
        </table>`;

      this.shadow.appendChild(this.template.content.cloneNode(true));
    }
  },
);
