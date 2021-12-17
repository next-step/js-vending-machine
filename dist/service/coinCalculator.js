import { CoinKeyValues, ErrorMsgs, InitialCoins } from '../constants.js';
export const getTotalMoney = (coins) => {
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
const getCharges = (sourceMoney) => {
    const res = { ...InitialCoins };
    const finalRemains = [...CoinKeyValues]
        .sort(() => Math.random() - 0.5)
        .reduce((prevSource, [key, val]) => {
        const { count, remains } = countSingleCoinValue(prevSource, val);
        res[key] = count;
        return remains;
    }, sourceMoney);
    if (finalRemains > 0)
        throw Error(ErrorMsgs.machine_CalculateError);
    return res;
};
export const saveCoinsCalculator = (store, money) => {
    const newCoinState = { ...store.get('ownedCoins') };
    const res = getCharges(money);
    CoinKeyValues.forEach(([key]) => {
        newCoinState[key] += res[key];
    });
    return newCoinState;
};
const getReturns = (chargedMoney, savedCoins) => {
    const newOwnedCoins = { ...savedCoins };
    const changeCoins = { ...InitialCoins };
    const finalRemains = CoinKeyValues.reduce((prevRemains, [key, val]) => {
        const { count, remains } = countSingleCoinValue(prevRemains, val, newOwnedCoins[key]);
        changeCoins[key] = count;
        newOwnedCoins[key] -= count;
        return remains;
    }, chargedMoney);
    return {
        changeCoins,
        charge: finalRemains,
        newOwnedCoins,
    };
};
export const changeCoinsCalculator = (store) => {
    const ownedCoins = store.get('ownedCoins');
    const chargedMoney = store.get('charge');
    const { changeCoins, charge, newOwnedCoins } = getReturns(chargedMoney, ownedCoins);
    return {
        charge,
        ownedCoins: newOwnedCoins,
        changeCoins,
    };
};
//# sourceMappingURL=coinCalculator.js.map