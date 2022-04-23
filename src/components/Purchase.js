import { COIN_KEY, ERROR_MESSAGE, STATE_KEY, VENDING_MACHINE } from '../constants.js';
import { $element, $focus, pipe, pipeline, unitGenerateNumber, descSortFirstVariable } from '../helpers/index.js';
import ComponentHandler from './abstract/index.js';

const template = ({ product: productList, purchase: chargedMoney, returned: returnedCoins }) => {
  // prettier-ignore
  return $element(/*html*/ `
    <section class="purchase-container">
      <div>
        <h3>금액 투입</h3>
        <form autocomplete class="purchase-money-charge-form">
          <input type="number" name="purchase-money-charge" placeholder="투입할 금액" required
                  autofocus min="${VENDING_MACHINE.MIN_PURCHASE_PRICE}" step="${VENDING_MACHINE.PRICE_STEP}" />
          <button type="submit" id="purchase-money-charge-button">투입하기</button>
        </form>
      </div>
      <p>투입한 금액 : <span id="purchase-charged-money">${unitGenerateNumber(chargedMoney)}</span>원</p>
      <div>
        <h3>구매할 수 있는 상품 현황</h3>
        <table class="purchase-available">
          <thead>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            <th>구매</th>
          </thead>
          <tbody>
            ${productList.map(({name, price, quantity}) => /*html*/`
            <tr>
              <td data-product-name="${name}">${name}</td>
              <td data-product-price="${price}">${unitGenerateNumber(price)}원</td>
              <td data-product-quantity="${quantity}">${unitGenerateNumber(quantity)}개</td>
              <td><button type="button" class="purchase-product-button" data-purchase-product="${name}">구매하기</button></td>
            </tr>`).join('')}
          </tbody>
        </table>
      </div>
      <div>
        <h3>잔돈</h3>
        <button id="coin-return-button" data-charge-money="${chargedMoney}">반환하기</button>
        <table class="cashbox-remaining">
          <thead>
            <th>동전</th>
            <th>개수</th>
          </thead>
          <tbody>
            <tr>
              <td>${COIN_KEY.COIN500}원</td>
              <td><span data-return-coin="${COIN_KEY.COIN500}">${returnedCoins[COIN_KEY.COIN500]}</span>개</td>
            </tr>
            <tr>
              <td>${COIN_KEY.COIN100}원</td>
              <td><span data-return-coin="${COIN_KEY.COIN100}">${returnedCoins[COIN_KEY.COIN100]}</span>개</td>
            </tr>
            <tr>
              <td>${COIN_KEY.COIN50}원</td>
              <td><span data-return-coin="${COIN_KEY.COIN50}">${returnedCoins[COIN_KEY.COIN50]}</span>개</td>
            </tr>
            <tr>
              <td>${COIN_KEY.COIN10}원</td>
              <td><span data-return-coin="${COIN_KEY.COIN10}">${returnedCoins[COIN_KEY.COIN10]}</span>개</td>
            </tr>
          </tbody>
        </table>
      </div>
    </section>`);
};

export default class Purchase extends ComponentHandler {
  static #template = template;

  render({ product, charge, purchase, returned }) {
    this.registeredProductList = [...product];
    this.chargeCoins = { ...charge };
    this.purchaseMoney = purchase;
    this.returnedCoins = { ...returned };

    this.replaceChildren(Purchase.#template({ product, purchase, returned }));
    setTimeout(() => $focus('[name="purchase-money-charge"]'), 10);
  }

  defineEvents() {
    return [
      {
        type: 'submit',
        callback: this.inputChargeMoney,
      },
      {
        type: 'click',
        callback: this.purchaseProduct,
      },
      {
        type: 'click',
        callback: this.returnChanges,
      },
    ];
  }

  inputChargeMoney = event => {
    event.preventDefault();

    const [{ valueAsNumber: chargeMoney }] = event.target.elements;
    document.getElementById('purchase-charged-money').textContent = chargeMoney.toLocaleString('ko-KR');

    this.setState({ key: STATE_KEY.PURCHASE, value: this.purchaseMoney + chargeMoney });
  };

  purchaseProduct = ({ target }) => {
    if (!target.matches('.purchase-product-button')) return;

    const productName = target.dataset.purchaseProduct;
    const selledProductList = this.registeredProductList.map(this.#checkProductWithSell(productName));

    this.setState([
      { key: STATE_KEY.PRODUCT, value: selledProductList },
      { key: STATE_KEY.PURCHASE, value: this.purchaseMoney },
    ]);
  };

  #checkProductWithSell = productName => {
    return product => {
      if (product.name !== productName) return product;
      const { remainedMoney, quantity } = this.#checkProduct(product);
      this.purchaseMoney = remainedMoney;
      return { ...product, quantity };
    };
  };

  #checkProduct = ({ price, quantity }) => {
    const remainedMoney = this.purchaseMoney - price;
    if (remainedMoney < 0) throw new Error(ERROR_MESSAGE.NOT_ENOUGH_MONEY);
    const selledQuantity = quantity - 1;
    if (selledQuantity < 0) throw new Error(ERROR_MESSAGE.NOT_ENOUGH_QUANTITY);
    return { remainedMoney, quantity: selledQuantity };
  };

  returnChanges = ({ target }) => {
    if (!target.matches('#coin-return-button')) return;
    if (this.purchaseMoney === 0) throw new Error(ERROR_MESSAGE.NOT_EXISTS_MONEY);

    this.#returnChangesCalculator();

    this.setState([
      { key: STATE_KEY.CHARGE, value: this.chargeCoins },
      { key: STATE_KEY.PURCHASE, value: this.purchaseMoney },
      { key: STATE_KEY.RETURNED, value: this.returnedCoins },
    ]);
  };

  #returnChangesCalculator = () =>
    pipeline(
      pipe(
        charges => Object.entries(charges),
        charges => charges.sort(descSortFirstVariable),
        charges => charges.forEach(this.#generateReturnCoins),
        this.#checkReturnCoins,
      ),
      this.chargeCoins,
    );

  #generateReturnCoins = ([coin, count]) => {
    const maxCount = Math.trunc(this.purchaseMoney / coin);
    const result = maxCount - count > 0 ? count : maxCount;
    this.purchaseMoney -= result * coin;
    this.chargeCoins[coin] -= result;
    this.returnedCoins[coin] = result;
  };

  #checkReturnCoins = () => {
    const isReturnCoinExists = Object.entries(this.returnedCoins).every(([, count]) => count === 0);
    if (isReturnCoinExists) throw new Error(ERROR_MESSAGE.EMPTY_RETURN_CHANGES);
  };
}

customElements.define('machine-purchase', Purchase);
