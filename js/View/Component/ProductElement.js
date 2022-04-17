class ProductElement extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const tr = document.createElement('tr');
    [(name, price, quantity)].forEach((value) => {
      const td = document.createElement('td');
      td.textContent = value;
      tr.appendChild(td);
    });

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './index.css');
    this.shadowRoot.append(link, tr);
  }

  // static of(name, price, quantity) {
  //   return new ProductElement(name, price, quantity);
  // }
  // MEMO lifeCycle
  attributeChangedCallback(name, oldValue, newValue) {}
}

export default ProductElement;
