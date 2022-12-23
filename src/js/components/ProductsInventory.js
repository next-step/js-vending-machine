export default function ProductsInventory({ $target, state }) {
  const $div = document.createElement('div');
  this.$target = $target;
  this.$target.appendChild($div);
  this.state = state;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const { products } = this.state;
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
        <tbody id="product-inventory-container">
					${products
            .map(
              $el =>
                `<tr>
                  <td>${$el.name}</td>
                  <td>${$el.price}</td>
                  <td>${$el.quantity}</td>
                </tr>`,
            )
            .join('')}
				</tbody>
      </table>`;
  };

  this.render();
}
