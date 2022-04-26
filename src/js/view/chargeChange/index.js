import { validateAmount } from '../../service/chargeChange/error.js';
import { getChargeChangeTemplate } from '../../template/chargeChange/index.js';
import { Component } from '../common.js';
import { STORE_KEY } from '../../constants/store/index.js';
import { COINS } from '../../constants/index.js';

class ChargeChange extends Component {
  constructor($props) {
    const chargeChangeTemplate = getChargeChangeTemplate();
    super(chargeChangeTemplate);

    this.$props = $props;
  }

  handleChargeAmount = (e) => {
    e.preventDefault();

    const { store } = this.$props;
    const chargeChange = store.state[STORE_KEY.CHARGE_CHANGE];
    const amount = Number(document.getElementById('vending-machine-charge-input').value);

    try {
      validateAmount(amount);

      const coins = this.coinChange({ amount, coinList: chargeChange.coins });
      store.setState({
        key: STORE_KEY.CHARGE_CHANGE,
        value: {
          amount: chargeChange.amount + amount,
          coins,
        },
      });
      this.updateView();
      e.target.reset();
    } catch (err) {
      alert(err.message);
    }
  };

  coinChange({ amount, coinList }) {
    const coins = [COINS[500], COINS[100], COINS[50], COINS[10]];
    let i = 0;

    while (amount > 0) {
      const count = amount / coins[i] >= 1 ? Math.floor(amount / coins[i]) : 0;

      coinList[i].count = coinList[i].count + count;
      amount = count > 0 ? (amount -= coins[i] * count) : amount;
      i++;
    }

    return coinList;
  }

  setEvent() {
    document.querySelector('.vending-machine-wrapper').addEventListener('submit', this.handleChargeAmount);
  }

  updateView = () => {
    const { store } = this.$props;
    const chargeChange = store.state[STORE_KEY.CHARGE_CHANGE];

    document.getElementById('vending-machine-charge-amount').textContent = chargeChange.amount;
    chargeChange.coins.forEach((coin) => {
      document.getElementById(`vending-machine-coin-${coin.value}-quantity`).textContent = `${coin.count}개`;
    });
  };
}

export default ChargeChange;
