import { COINS } from '../constants/constant.js';
import { vendingMachine } from '../models/VendingMachine.js';
import { getRandom } from '../utils/random.js';
import {
  clearChargeForm,
  renderCoins,
  renderTotalCharge,
} from '../views/Charge.js';

export const addCharge = (chargeAmount) => {
  const machineChargeItem = vendingMachine.getCharge();
  const amount = machineChargeItem.amount + chargeAmount;
  const coins = getCoins(chargeAmount);

  vendingMachine.setCharge({
    amount: amount,
    coins: coins,
  });

  renderTotalCharge(amount);
  renderCoins(coins);

  clearChargeForm();
};

export const getCoins = (amount) => {
  const coinUnit = Object.values(COINS);
  const coins = vendingMachine.getCharge().coins;

  let idx = 1;
  for (const coin of coinUnit) {
    const max = Math.floor(amount / coin);
    const quantity = idx === coinUnit.length ? max : getRandom(0, max);

    amount = amount - quantity * coin;
    coins[COINS[`COIN_${coin}`]] = coins[COINS[`COIN_${coin}`]] + quantity;

    idx = idx + 1;
  }

  return coins;
};
