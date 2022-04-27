import Event from '../../Controller/Event/Event.js';

class Router extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });

    const container = document.createElement('nav');
    container.setAttribute('id', 'router');
    container.innerHTML = String.raw`
      <button id="product-manage-menu">상품관리</button>
      <button id="vending-machine-manage-menu">잔돈충전</button>
      <button id="product-purchase-menu">상품구매</button>
    `;

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './index.css');

    this.shadowRoot.addEventListener('click', Event.router.click);

    this.shadowRoot.append(link, container);
  }
}

export default Router;
