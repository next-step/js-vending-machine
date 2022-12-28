export default function CoinList({ $target, state }) {
  const $div = document.createElement('div');
  this.$target = $target;
  this.$target.appendChild($div);
  this.state = state;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    const coinListHTML = Object.entries(this.state)
      .sort((a, b) => b[0] - a[0])
      .map(
        ([coin, amount]) =>
          `<tr>
					<td>${coin}원</td>
					<td id="vending-machine-coin-500-quantity">
						${amount.toLocaleString('ko-KR')}개
					</td>
				</tr>`,
      )
      .join('');

    $div.innerHTML = `
			<h3>동전 보유 현황</h3>
      <table class="cashbox-remaining pressed">
        <thead>
          <tr>
            <th>동전</th>
            <th>개수</th>
          </tr>
        </thead>
        <tbody>
				${coinListHTML}
        </tbody>
      </table>`;
  };

  this.render();
}
