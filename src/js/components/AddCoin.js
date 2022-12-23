export default function AddCoin({ $target, state, onSubmit }) {
  const $div = document.createElement('div');
  this.state = state;
  this.onSubmit = onSubmit;
  this.$target = $target;
  this.$target.appendChild($div);

  this.render = () => {
    $div.innerHTML = `
			<h3>자판기 잔돈 충전하기</h3>
      <div class="vending-machine-wrapper">
        <form class="charging-money-form">
          <input
            type="number"
            name="vending-machine-charge-amount"
            id="vending-machine-charge-input"
            autofocus
          />
          <input class="btn" type="submit" id="vending-machine-charge-button" value="충전하기" />
        </form>
      </div>
      <p>보유 금액: <span id="vending-machine-charge-amount">${this.state.toLocaleString(
        'ko-KR',
      )}</span>원</p>
      <hr />`;
  };

  this.render();
}
