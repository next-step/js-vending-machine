class ProductCharge extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const table = document.createElement('table');
    table.setAttribute('class', 'product-inventory');

    const colgroup = document.createElement('colgroup');
    const col = document.createElement('col');
    col.setAttribute('style', 'width: 140px');
    colgroup.append(col, col, col);

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const theadInfo = ['상품명', '가격', '수량'];
    theadInfo.forEach((info) => {
      const th = document.createElement('th');
      th.textContent = info;
      tr.appendChild(th);
    });
    thead.appendChild(tr);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'product-inventory-container');
    tbody.setAttribute('data-manage', 'product');
    table.append(colgroup, thead, tbody);

    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './index.css');
    this.shadowRoot.append(link, table);
  }

  // MEMO lifeCycle
  attributeChangedCallback(name, oldValue, newValue) {}
}

export default ProductCharge;
