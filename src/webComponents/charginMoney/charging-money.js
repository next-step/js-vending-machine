class ChargingMoney extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.root.innerHTML = 'ChargingMoney_!!!';
  }
}

window.customElements.define('charging-money', ChargingMoney);
