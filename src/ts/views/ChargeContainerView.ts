import AbstractView from './abstractView';
import { isPredicatedElement } from '../utils/predicator';

class ChargeContainerView extends AbstractView<HTMLElement> {
  render(coins: Record<CoinKey, CoinObj> | null) {
    super.render(coins);
    this.subscribeChargeCoin();
  }

  get chargeFormElement() {
    return document.querySelector('.charge-form');
  }

  subscribeChargeCoin = () => {
    if (!isPredicatedElement<HTMLFormElement>(this.chargeFormElement)) return;

    this.chargeFormElement.addEventListener('submit', (event: Event | SubmitEvent) => {
      event.preventDefault();
      const dataArray = [...new FormData(event.target)];
      const amount = Object.fromEntries(dataArray)['amount'];
      const coins = this.store.dispatch('chargeCoin', amount);
      this.render(coins);
    });
  };

  isExistCoin = (coins: Record<CoinKey, CoinObj>): coins is Record<CoinKey, CoinObj> => {
    return (coins as Record<CoinKey, CoinObj>) !== null;
  };

  calculateCoinsSum = (coins: Record<CoinKey, CoinObj>) => {
    return Object.values(coins).reduce((accPrice: number, cur: CoinObj) => {
      accPrice += cur.value * cur.count;
      return accPrice;
    }, 0);
  };

  getMarkup(coins: Record<CoinKey, CoinObj>) {
    const getCoinMarkup = (coin: CoinObj) => {
      return /* html */ ` <tr>
                    <td>${coin.value}원</td>
                    <td>${coin.count}개</td>
                </tr>`;
    };

    return /* html */ `
        <h3>자판기 돈통 충전하기</h3>
        <form class="charge-form">
            <input type="number" name="amount" id="vending-machine-charge-input" autofocus required/>
            <button id="vending-machine-charge-button">충전하기</button>
        </form>
        <p>보유 금액: <span id="vending-machine-charge-amount">
        ${this.isExistCoin(coins) ? this.calculateCoinsSum(coins) : 0}</span>원</p>
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
                ${this.isExistCoin(coins) ? Object.values(coins).map(getCoinMarkup).join('') : ''}
            </tbody>
        </table>
`;
  }
}

export default new ChargeContainerView();
