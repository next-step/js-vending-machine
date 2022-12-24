export default function CoinList({ $target, state }) {
  const $div = document.createElement('div');
  this.$target = $target;
  this.$target.appendChild($div);
  this.state = state;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };
  // 이것도 리펙토링
  this.render = () => {
    console.log(this.state);

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
          <tr>
            <td>500원</td>
            <td id="vending-machine-coin-500-quantity">${this.state[500].toLocaleString(
              'ko-KR',
            )}개</td>
          </tr>
          <tr>
            <td>100원</td>
            <td id="vending-machine-coin-100-quantity">${this.state[100].toLocaleString(
              'ko-KR',
            )}개</td>
          </tr>
          <tr>
            <td>50원</td>
            <td id="vending-machine-coin-50-quantity">${this.state[50].toLocaleString(
              'ko-KR',
            )}개</td>
          </tr>
          <tr>
            <td>10원</td>
            <td id="vending-machine-coin-10-quantity">${this.state[10].toLocaleString(
              'ko-KR',
            )}개</td>
          </tr>
        </tbody>
      </table>`;
  };

  this.render();
}
