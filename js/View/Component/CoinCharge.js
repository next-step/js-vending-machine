// Create a class for the element
class CoinCharge extends HTMLElement {
  constructor() {
    super();
    const shadow = this.attachShadow({ mode: 'open' });
    const table = document.createElement('table');
    table.setAttribute('class', 'product-inventory margin-auto');

    const colgroup = document.createElement('colgroup');
    const col = document.createElement('col');
    col.setAttribute('style', 'width: 140px');
    colgroup.append(col, col, col);

    const thead = document.createElement('thead');
    const tr = document.createElement('tr');
    const th = document.createElement('th');
    const theadInfo = ['상품명', '가격', '수량'];
    theadInfo.forEach((info) => {
      th.textContent = info;
      tr.appendChild(th);
    });
    thead.appendChild(tr);

    const tbody = document.createElement('tbody');
    tbody.setAttribute('id', 'product-inventory-container');

    table.append(colgroup, thead, tbody);

    this.shadowRoot.appendChild(table);
  }
}

// Define the new element
customElements.define('product-inventory', CoinCharge);
