import { COIN_INFO, COIN_TYPE } from '../consts/coin.js';
import mathUtils from "../utils/mathUtils.js";

function convertToCoins(amount) {
  let remainedAmount = amount;
  const coins = {
    [COIN_TYPE.UNIT_500]: 0,
    [COIN_TYPE.UNIT_100]: 0,
    [COIN_TYPE.UNIT_50]: 0,
    [COIN_TYPE.UNIT_10]: 0,
  };

  while (remainedAmount > 0) {
    const availableCoinTypes = Object.values(COIN_TYPE).filter(
      (coinType) => COIN_INFO[coinType].value <= remainedAmount
    );

    const randomIndex = mathUtils.getRandomNumber(0, availableCoinTypes.length - 1);
    const selectedCoinType = availableCoinTypes[randomIndex];

    coins[selectedCoinType] += 1;
    remainedAmount -= COIN_INFO[selectedCoinType].value;
  }

  return coins;
}

function mergeCoins(originCoins, newCoins) {
  return Object.entries(originCoins).reduce(
    (prev, [coinType, originCount]) => {
      const newCount = newCoins[coinType];
      return {
        ...prev,
        [coinType]: originCount + newCount,
      };
    },
    {}
  );
}

function computeTotalAmount(coins) {
  return Object.entries(coins).reduce(
    (prev, [coinType, count]) => prev + COIN_INFO[coinType].value * count,
    0
  );
}

export default {
  convertToCoins,
  mergeCoins,
  computeTotalAmount,
};
