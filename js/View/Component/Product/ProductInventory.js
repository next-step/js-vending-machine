class ProductInventory extends HTMLElement {
  constructor() {
    super();

    const shadow = this.attachShadow({ mode: 'open' });
    const table = document.createElement('table');
    table.setAttribute('class', 'product-inventory');

    table.innerHTML = String.raw`
    <colgroup>
      <col style:"width: 140px">
      <col style:"width: 140px">
      <col style:"width: 140px">
    </colgroup>
    <thead>
      <tr>
        <th>상품명</th>
        <th>가격(원)</th>
        <th>수량(개)</th>
      </tr>
    </thead>
    <tbody id="product-inventory-container" data-manage="product">
    </tbody>
    `;

    // FIXME : css 중복 리팩토링
    const link = document.createElement('link');
    link.setAttribute('rel', 'stylesheet');
    link.setAttribute('href', './index.css');
    this.shadowRoot.append(link, table);
  }
}

export default ProductInventory;
