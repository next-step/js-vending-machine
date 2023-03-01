export default class ChargingMoneyPage extends HTMLElement {
  constructor() {
    super();
    this.shadow = this.attachShadow({ mode: 'open' });
    this.template = document.createElement('template');
  }

  connectedCallback() {
    this.initHtml();
  }

  initHtml() {
    this.template.innerHTML = `
			<link rel="stylesheet" href="./src/css/index.css" />
			<section data-cy="charging-money">
				<add-coin></add-coin>
				<coin-list></coin-list>
			</section>`;
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('charge-money', ChargingMoneyPage);
