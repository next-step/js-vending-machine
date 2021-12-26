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

export default changeChargeToCoin;
