import { COINS } from "../constants/index.js"

const changeChargeToCoin = (machineCharge) => {
  let currentCharge = machineCharge;

  return COINS.reduce((prevObj, [coin]) => {
    prevObj[coin] = Math.floor(currentCharge / coin);
    if (currentCharge >= coin) {
      currentCharge = currentCharge % coin;
    }
    // console.dir(prevObj);
    // console.log(currentCharge);
    return prevObj;
  }, {});
}

export default changeChargeToCoin;