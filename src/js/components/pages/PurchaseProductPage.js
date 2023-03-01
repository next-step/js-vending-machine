export default class PurchaseProductPage extends HTMLElement {
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
			<section data-cy="purchase-product">
				<input-money></input-money>
				<purchase-list></purchase-list>
				<left-coins></left-coins>
		</section>`;
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('purchase-product', PurchaseProductPage);
