export default function ProductList({ $target, state }) {
  const $div = document.createElement('div');
  this.$target = $target;
  this.$target.appendChild($div);
  this.state = state;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const productListHTML = this.state
      .map(
        ({ name, price, quantity }) =>
          `<tr>
						<td>${name}</td>
						<td>${price.toLocaleString('ko-KR')}</td>
						<td>${quantity.toLocaleString('ko-KR')}</td>
					</tr>`,
      )
      .join('');

    $div.innerHTML = `
			<h3>상품 리스트</h3>
      <table data-cy="products-inventory" class="product-inventory pressed">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody id="product-inventory-container">
					${productListHTML}
				</tbody>
      </table>`;
  };

  this.render();
}
