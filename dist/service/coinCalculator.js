import { ErrorMsgs } from '../constants.js';
const CoinKeys = ['total', 'q500', 'q100', 'q50', 'q10'];
const CoinValues = Object.freeze([500, 100, 50, 10]);
const singleCoinCalculator = (source, coin) => {
    const count = Math.floor(source / coin);
    const remains = source - count * coin;
    return { count, remains };
};
const chargeCalculator = (source) => {
    const res = [source];
    const finalRemains = [...CoinValues]
        .sort(() => Math.random() - 0.5)
        .reduce((prevSource, c) => {
        const { count, remains } = singleCoinCalculator(prevSource, c);
        res[CoinValues.indexOf(c) + 1] = count;
        return remains;
    }, source);
    if (finalRemains > 0)
        throw Error(ErrorMsgs.machine_CalculateError);
    return res;
};
const saveCoinsCalculator = (store, money) => {
    const coins = { ...store.get('coins') };
    const res = chargeCalculator(money);
    CoinKeys.forEach((key, i) => {
        coins[key] += res[i];
    });
    return coins;
};
export { saveCoinsCalculator };
//# sourceMappingURL=coinCalculator.js.map