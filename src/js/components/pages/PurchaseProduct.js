export default class PurchaseProduct extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
  }

  connectedCallback() {
    this.init();
  }

  init() {
    this.template.innerHTML = `
			<link rel="stylesheet" href="./src/css/index.css" />
      <div class="purchase-container">
        <h3>충전하기</h3>
        <div class="vending-machine-wrapper">
          <input type="number" name="charge-amount" id="charge-input" />
          <button id="charge-button">충전하기</button>
        </div>
        <p>충전 금액: <span id="charge-amount">0</span>원</p>
      </div>`;
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('purchase-product', PurchaseProduct);
