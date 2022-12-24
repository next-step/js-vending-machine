/* eslint-disable prefer-object-spread */
import AddCoin from './AddCoin.js';
import CoinList from './CoinList.js';
import TotalMoney from './TotalMoney.js';
import store from '../store/store.js';
import { COIN_STANDARD } from '../constants/vendingMachine.js';

export default function ChargingMoneyPage({ $target }) {
  this.$target = $target;

  const $page = document.createElement('section');
  $page.dataset.cy = 'charging-money';

  this.render = () => {
    this.$target.appendChild($page);
  };

  this.setState = () => {
    this.totalMoney.setState(store.getState().totalMoney);
    this.coinList.setState(store.getState().coins);
  };

  this.coinCalculate = total => {
    let totalMoney = total;

    return COIN_STANDARD.reduce((acc, coin) => {
      const count = Math.floor(totalMoney / coin);
      totalMoney -= coin * count;
      return [...acc, count];
    }, []);
  };

  this.addCoin = new AddCoin({
    $target: $page,
    onSubmit: newMoney => {
      const newTotalMoney = store.getState().totalMoney + newMoney;
      const newCoins = { ...store.getState().coins };
      const newCoinValue = this.coinCalculate(newMoney);

      COIN_STANDARD.forEach((coin, idx) => {
        newCoins[coin] += newCoinValue[idx];
      });

      store.setState({
        ...store.getState(),
        coins: { ...newCoins },
        totalMoney: newTotalMoney,
      });
      this.setState();
    },
  });

  this.totalMoney = new TotalMoney({ $target: $page, state: store.getState().totalMoney });

  this.coinList = new CoinList({ $target: $page, state: store.getState().coins });
}
