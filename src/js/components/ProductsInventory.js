export default function ProductsInventory({ $target }) {
  const $div = document.createElement('div');
  this.$target = $target;
  this.$target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
			<h3>추가된 상품</h3>
      <table data-cy="products-inventory" class="product-inventory pressed">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody id="product-inventory-container"></tbody>
      </table>`;
  };

  this.render();
}
