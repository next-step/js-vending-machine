export default class ManageProductPage extends HTMLElement {
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
			<section data-cy="manage-products">
				<add-product></add-product>
				<product-list></product-list>
			</section>`;
    this.shadow.appendChild(this.template.content.cloneNode(true));
  }
}

customElements.define('manage-product', ManageProductPage);
