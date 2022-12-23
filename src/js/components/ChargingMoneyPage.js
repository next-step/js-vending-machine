import AddCoin from './AddCoin.js';
import CoinList from './CoinList.js';
import store from '../store/store.js';

export default function ChargingMoneyPage({ $target }) {
  this.$target = $target;

  const $page = document.createElement('section');
  $page.dataset.cy = 'charging-money';

  this.render = () => {
    this.$target.appendChild($page);
  };

  this.setState = newState => {
    this.state = newState;
    this.render();
  };

  this.addCoin = new AddCoin({
    $target: $page,
    state: store.getState().totalMoney,
    onSubmit: () => {},
  });
  this.coinList = new CoinList({ $target: $page, state: store.getState().coins });
}
