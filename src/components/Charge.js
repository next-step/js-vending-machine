import { COINS, COIN_KEY, STATE_KEY, VENDING_MACHINE } from '../constants.js';
import ComponentHandler from './abstract/index.js';
import { $element, $focus, pipe, pipeline, totalCoinCalculator, unitGenerateNumber } from '../helpers/index.js';

const template = coins => {
  const generatedMoney = pipeline(
    pipe(
      coins => Object.entries(coins),
      coins => coins.reduce(totalCoinCalculator, 0),
      money => unitGenerateNumber(money),
    ),
    coins,
  );

  return $element(/*html*/ `
    <section class="changes-charge-container">
      <div>
        <h3>자판기 동전 충전하기</h3>
        <form autocomplete class="changes-charge-form">
          <input type="number" name="changes-charge" placeholder="충전할 금액" required
                  autofocus min="${VENDING_MACHINE.MIN_PRICE}" step="${VENDING_MACHINE.PRICE_STEP}" />
          <button type="submit" id="changes-charge-button">추가하기</button>
        </form>
      </div>
      <p>보유 금액 : <span>${generatedMoney}원</span></p>
      <div>
        <h3>자판기 동전 현황</h3>
        <table class="changes-cashbox">
          <thead>
            <th>동전</th>
            <th>개수</th>
          </thead>
          <tbody>
            <tr>
              <td>${COIN_KEY.COIN500}원</td>
              <td><span data-charge-coin="${COIN_KEY.COIN500}">${coins[COIN_KEY.COIN500]}</span>개</td>
            </tr>
            <tr>
              <td>${COIN_KEY.COIN100}원</td>
              <td><span data-charge-coin="${COIN_KEY.COIN100}">${coins[COIN_KEY.COIN100]}</span>개</td>
            </tr>
            <tr>
              <td>${COIN_KEY.COIN50}원</td>
              <td><span data-charge-coin="${COIN_KEY.COIN50}">${coins[COIN_KEY.COIN50]}</span>개</td>
            </tr>
            <tr>
              <td>${COIN_KEY.COIN10}원</td>
              <td><span data-charge-coin="${COIN_KEY.COIN10}">${coins[COIN_KEY.COIN10]}</span>개</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>`);
};

export default class Charge extends ComponentHandler {
  static #template = template;

  render({ charge }) {
    this.CHARGE = charge;

    this.replaceChildren(Charge.#template(charge));
    setTimeout(() => $focus('[name="changes-charge"]'), 10);
  }

  defineEvents() {
    return [
      {
        type: 'submit',
        callback: this.inputMoney,
      },
    ];
  }

  inputMoney = event => {
    event.preventDefault();

    const [{ valueAsNumber: money }] = event.target.elements;
    const parsedCoins = this.#distributeCoins(money);

    pipeline(
      pipe(
        charge => Object.keys(charge),
        chargeKeys => chargeKeys.forEach(key => (this.CHARGE[key] += parsedCoins[key])),
      ),
      this.CHARGE,
    );

    this.setState({ key: STATE_KEY.CHARGE, value: this.CHARGE });
  };

  #distributeCoins(money) {
    const coinInventory = { ...COINS };
    let remainMoney = money;
    while (remainMoney > 0) {
      const coin = this.#randomCoin();
      if (remainMoney - coin < 0) continue;
      coinInventory[coin] = coinInventory[coin] + 1;
      remainMoney -= coin;
    }

    return coinInventory;
  }

  #randomCoin() {
    const coins = Object.values(COIN_KEY);
    return Number(coins[Math.floor(Math.random() * coins.length)]);
  }
}

customElements.define('machine-charge', Charge);
