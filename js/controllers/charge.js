import { CHARGE, COINS } from '../constants/constant.js';
import { vendingMachine } from '../index.js';
import { getRandom } from '../utils/random.js';
import { validate } from '../utils/validator.js';
import { chargeAmountValidations } from '../validations/validation.js';
import {
  clearChargeForm,
  renderCoins,
  renderTotalCharge,
} from '../views/Charge.js';

export const addCharge = (chargeAmount) => {
  const machineChargeItem = vendingMachine.getCharge();
  const amount = machineChargeItem.amount + chargeAmount;
  const coins = addCoins(chargeAmount);

  vendingMachine.setCharge({
    amount: amount,
    coins: coins,
  });

  renderTotalCharge(amount);
  renderCoins(coins);

  clearChargeForm();
};

export const addCoins = (amount) => {
  const coinUnit = Object.values(COINS);
  const coins = vendingMachine.getCharge().coins;

  let idx = 1;
  for (const coin of coinUnit) {
    const coinMaxNumber = Math.floor(amount / coin);
    const quantity =
      idx === coinUnit.length ? coinMaxNumber : getRandom(0, coinMaxNumber);

    amount = amount - quantity * coin;
    coins[COINS[`COIN_${coin}`]] = coins[COINS[`COIN_${coin}`]] + quantity;

    idx = idx + 1;
  }

  return coins;
};

export const handleFormChargeSubmit = (event) => {
  event.preventDefault();
  const chargeAmount = event.target.elements[CHARGE.AMOUNT].value;
  try {
    validate(chargeAmount, chargeAmountValidations);
    addCharge(+chargeAmount);
  } catch (err) {
    alert(err.message);
  }
};
