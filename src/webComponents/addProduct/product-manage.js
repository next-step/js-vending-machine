class ProductManage extends HTMLElement {
  constructor() {
    super();
    this.root = this.attachShadow({ mode: 'open' });
  }

  connectedCallback() {
    this.root.innerHTML = 'PRODUCTMANAGE_!!!';
  }
}

window.customElements.define('product-manage', ProductManage);
