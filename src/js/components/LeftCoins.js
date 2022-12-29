export default function LeftCoins({ $target, state, onClick }) {
  const $div = document.createElement('div');
  this.onClick = onClick;
  this.state = state;
  this.$target = $target;
  this.$target.appendChild($div);

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
				<td data-cy="coins">
					${amount.toLocaleString('ko-KR')}개
				</td>
			</tr>`,
      )
      .join('');

    $div.innerHTML = `
			 <h3>잔돈</h3>
				<form>
					<input type="button" class="btn" id="coin-return-button" value="반환하기"/>
				</form>
        <table class="cashbox-change pressed">
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

    $div.querySelector('form').addEventListener('click', () => {
      this.onClick();
    });
  };

  this.render();
}
