/* eslint-disable prefer-object-spread */
import AddCoin from '../AddCoin.js';
import CoinList from '../CoinList.js';
import TotalMoney from '../TotalMoney.js';
import { COIN_STANDARD } from '../../constants/vendingMachine.js';
import { getItem, setItem } from '../../utils/Storage.js';

export default function ChargingMoneyPage({ $target }) {
  this.$target = $target;
  this.state = getItem('state');

  const $page = document.createElement('section');
  $page.dataset.cy = 'charging-money';

  this.render = () => {
    this.$target.appendChild($page);
  };

  this.setState = newState => {
    this.state = newState;
    const { totalMoney, coins } = this.state;
    this.totalMoney.setState(totalMoney);
    this.coinList.setState(coins);
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
      const { totalMoney, coins } = this.state;
      const newCoinValue = this.coinCalculate(newMoney);
      const newCoins = { ...coins };

      COIN_STANDARD.forEach((coin, idx) => {
        newCoins[coin] += newCoinValue[idx];
      });

      const newState = {
        ...this.state,
        coins: { ...newCoins },
        totalMoney: totalMoney + newMoney,
      };

      setItem('state', newState);
      this.setState(newState);
    },
  });

  this.totalMoney = new TotalMoney({ $target: $page, state: this.state.totalMoney });

  this.coinList = new CoinList({ $target: $page, state: this.state.coins });
}
