import AbstractView from './abstractView';

class ChargeContainerView extends AbstractView<HTMLElement, Record<CoinKey, CoinObj>> {
  render(coins: Record<CoinKey, CoinObj>) {
    super.render(coins);
  }

  renderError(message: string) {
    const markup = `<h3>${message}<h3>`;
    this.containerElement.insertAdjacentHTML('afterbegin', markup);
  }

  subscribeChargeCoin(chargeCoinHandler: (coin: number) => void) {
    this.containerElement.addEventListener('submit', () => {
      const chargeAmount = <HTMLInputElement>(
        this.containerElement.querySelector('input[name="amount"]')
      );
      chargeCoinHandler(chargeAmount.valueAsNumber);
    });
  }

  generateMarkup(coins: Record<CoinKey, CoinObj>): string {
    const coinSum = Object.values(coins).reduce((accPrice: number, cur: CoinObj) => {
      accPrice += cur.value * cur.count;
      return accPrice;
    }, 0);

    const coinHtml = (coin: CoinObj) => {
      return /* html */ ` <tr>
                    <td>${coin.value}원</td>
                    <td id="vending-machine-coin-500-quantity">${coin.count}</td>
                </tr>`;
    };

    return /* html */ `
        <h3>자판기 돈통 충전하기</h3>
        <form class="vending-machine-wrapper">
            <input type="number" name="amount" id="vending-machine-charge-input" autofocus required/>
            <button id="vending-machine-charge-button">충전하기</button>
        </form>
        <p>보유 금액: <span id="vending-machine-charge-amount">${coinSum}</span>원</p>
        <h3>동전 보유 현황</h3>
        <table class="cashbox-remaining">
            <colgroup>
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>동전</th>
                    <th>개수</th>
                </tr>
            </thead>
            <tbody>
                ${Object.values(coins).map(coinHtml).join('')}
            </tbody>
        </table>
`;
  }
}

export default new ChargeContainerView();
