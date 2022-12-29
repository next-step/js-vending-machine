export default function PurchaseList({ $target, state, onClick }) {
  const $div = document.createElement('div');
  this.$target = $target;
  this.$target.appendChild($div);
  this.state = state;
  this.onClick = onClick;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const productListHTML = this.state
      .map(
        ({ name, price, quantity }) =>
          `<tr>
						<td class="name">${name}</td>
						<td>${price.toLocaleString('ko-KR')}</td>
						<td>${quantity.toLocaleString('ko-KR')}</td>
					</tr>`,
      )
      .join('');

    $div.innerHTML = `
			<h3>구매할 수 있는 상품 현황</h3>
      <table data-cy="purchase-list" class="purchase-list pressed">
        <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
        </thead>
        <tbody>
					${productListHTML}
				</tbody>
      </table>`;
  };

  this.render();

  $div.addEventListener('click', event => {
    const selectedName = event.target.closest('tr').querySelector('.name').innerHTML;
    try {
      this.onClick(selectedName);
    } catch (error) {
      alert(error.message);
    }
  });
}
