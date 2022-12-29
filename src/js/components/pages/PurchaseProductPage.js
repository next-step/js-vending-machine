/* eslint-disable no-param-reassign */
import { COIN_STANDARD } from '../../constants/vendingMachine.js';
import { getItem, setItem } from '../../utils/Storage.js';
import PurchaseList from '../PurchaseList.js';
import InputMoneyForm from '../InputMoneyForm.js';
import LeftCoins from '../LeftCoins.js';
import InputMoney from '../InputMoney.js';
import ERROR_MESSAGES from '../../constants/errorMessages.js';

export default function PurchaseProductPage({ $target }) {
  this.$target = $target;
  this.state = getItem('state');

  const $page = document.createElement('section');
  // $page.dataset.cy = 'charging-money';

  this.render = () => {
    this.$target.appendChild($page);
  };

  this.setState = newState => {
    this.state = newState;
    this.inputMoney.setState(this.state.inputMoney);
    this.purchaseList.setState(this.state.products);
    this.leftCoins.setState(this.state.returnCoins);
  };

  this.inputMoneyForm = new InputMoneyForm({
    $target: $page,
    onSubmit: newMoney => {
      const newState = {
        ...this.state,
        inputMoney: this.state.inputMoney + newMoney,
      };
      setItem('state', newState);
      this.setState(newState);
    },
  });

  this.inputMoney = new InputMoney({
    $target: $page,
    state: this.state.inputMoney,
  });

  this.purchaseList = new PurchaseList({
    $target: $page,
    state: this.state.products,
    onClick: selectedName => {
      const index = this.state.products.findIndex(product => product.name === selectedName);
      const newState = { ...this.state };

      if (newState.inputMoney - newState.products[index].price < 0)
        throw new Error(ERROR_MESSAGES.NOT_ENOUGH_MONEY);

      newState.inputMoney -= newState.products[index].price;
      newState.products[index].quantity -= 1;
      if (newState.products[index].quantity === 0) newState.products.splice(index, 1);

      setItem('state', newState);
      this.setState(newState);
    },
  });

  this.coinCalculate = (money, newCoins) => {
    let totalMoney = 0;
    let chargeMoney = money;
    const returnCoins = {};

    COIN_STANDARD.forEach(coin => {
      const count = Math.floor(chargeMoney / coin);
      if (newCoins[coin] < count) {
        chargeMoney -= coin * newCoins[coin];
        returnCoins[coin] = newCoins[coin];
        newCoins[coin] = 0;
      } else {
        chargeMoney -= coin * count;
        newCoins[coin] -= count;
        returnCoins[coin] = count;
      }
      totalMoney += coin * newCoins[coin];
    });
    return [chargeMoney, totalMoney, returnCoins];
  };

  this.leftCoins = new LeftCoins({
    $target: $page,
    state: this.state.returnCoins,
    onClick: () => {
      const { inputMoney, coins } = this.state;
      const newCoins = { ...coins };
      const [newInputMoney, newTotalMoney, newReturnCoins] = this.coinCalculate(
        inputMoney,
        newCoins,
      );

      const newState = {
        ...this.state,
        coins: { ...newCoins },
        totalMoney: newTotalMoney,
        inputMoney: newInputMoney,
        returnCoins: newReturnCoins,
      };

      setItem('state', newState);
      this.setState(newState);
    },
  });
}
