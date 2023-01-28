import { HASH_NAV_MAP } from '../constants/route.js';
import './addProduct/product-manage.js';
import './charginMoney/charging-money.js';
import './hash-nav-button.js';
import './route.js';

class App extends HTMLElement {
  constructor() {
    super();

    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    const template = document.createElement('template');

    template.innerHTML = /* html */ `
    <slot>
      ${HASH_NAV_MAP.map(({ id, nameKor }) => {
        return `
          <hash-nav-button hash-id="${id}">${nameKor}</hash-nav-button>
        `;
      }).join('')}
      <route-wrapper></route-wrapper>
    </slot>
    `;

    this.root.appendChild(template.content.cloneNode(true));
  }
}

window.customElements.define('vending-machine-app', App);
