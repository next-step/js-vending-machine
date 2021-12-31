import { COINS } from "../constants/index.js"

const changeChargeToCoin = (machineCharge) => {
  let currentCharge = machineCharge;

  return COINS.reduce((prevObj, [coin]) => {
    prevObj[coin] = Math.floor(currentCharge / coin);
    if (currentCharge >= coin) {
      currentCharge = currentCharge % coin;
    }
    return prevObj;
  }, {});
}

export const returnChargeAmountToRestCoin = (purchaseCharge, coins) => {
  let currentCharge = purchaseCharge;

  return coins.reduce((prevObj, [coin, amount]) => {
    let divisionAmount = Math.floor(currentCharge / coin);

    prevObj[coin] = divisionAmount > amount ? amount : divisionAmount;
    currentCharge -= prevObj[coin] * coin;
    return prevObj;
  }, {});
}

export default changeChargeToCoin;
