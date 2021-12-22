import { CoinKeyValues, ErrorMsgs, InitialCoins } from '../constants.js';
export const getTotalFromCoins = (coins) => {
    return CoinKeyValues.reduce((acc, [key, val], i) => {
        acc += coins[key] * val;
        return acc;
    }, 0);
};
const countSingleCoinValue = (sourceMoney, coinValue, ownedCoins = Number.MAX_SAFE_INTEGER) => {
    const count = Math.min(Math.floor(sourceMoney / coinValue), ownedCoins);
    const remains = sourceMoney - count * coinValue;
    return { count, remains };
};
export const saveCoinsCalculator = (store, money) => {
    const newOwnedCoins = { ...store.get('ownedCoins') };
    const finalRemains = [...CoinKeyValues]
        .sort(() => Math.random() - 0.5)
        .reduce((prevSource, [key, val]) => {
        const { count, remains } = countSingleCoinValue(prevSource, val);
        newOwnedCoins[key] += count;
        return remains;
    }, money);
    if (finalRemains > 0)
        throw Error(ErrorMsgs.machine_CalculateError);
    return newOwnedCoins;
};
export const changeCoinsCalculator = (store) => {
    const prevCharge = store.get('charge');
    const ownedCoins = { ...store.get('ownedCoins') };
    const changeCoins = { ...InitialCoins };
    const charge = CoinKeyValues.reduce((prevRemains, [key, val]) => {
        const { count, remains } = countSingleCoinValue(prevRemains, val, ownedCoins[key]);
        changeCoins[key] = count;
        ownedCoins[key] -= count;
        return remains;
    }, prevCharge);
    return {
        changeCoins,
        charge,
        ownedCoins,
    };
};
//# sourceMappingURL=coinCalculator.js.map