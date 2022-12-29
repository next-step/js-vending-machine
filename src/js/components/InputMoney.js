export default function inputMoney({ $target, state }) {
  const $div = document.createElement('div');
  this.$target = $target;
  this.$target.appendChild($div);
  this.state = state;

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.render = () => {
    $div.innerHTML = `
			<p>투입한 금액: <span id="charge-amount">${this.state.toLocaleString('ko-KR')}</span>원</p>
      <hr />`;
  };

  this.render();
}
