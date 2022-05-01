import { cashboxException } from "../exception/CashboxException.js";
import { getCharge, getCoins } from "../service/index.js";

export default class Cashbox {
    static MIN_CHARGE = 0;
    static CHARGE_UNIT = 10;
    static COINS = [500, 100, 50, 10];

    #haveCharge = 0;
    #haveCoins;

    constructor() {
        this.#haveCharge = getCharge();
        this.#haveCoins = getCoins();
    }

    static validate(charge) {
        if (!charge) {
            throw cashboxException.notExistCharge();
        }

        if (charge === Cashbox.MIN_CHARGE) {
            throw cashboxException.outOfRangeCharge();
        }

        if (charge % Cashbox.CHARGE_UNIT !== 0) {
            throw cashboxException.notMatchChargeUnit();
        }
    }

    static getInitCoins() {
        return {
            500: 0,
            100: 0,
            50: 0,
            10: 0,
        };
    }

    computeCharge(charge) {
        let remainCharge = charge;
        let chargeCoin = Cashbox.getInitCoins();

        Cashbox.COINS.forEach((coin) => {
            if (coin !== 10) {
                chargeCoin[coin] = this.#getCoinAmount(remainCharge, coin);
                remainCharge = remainCharge - coin * chargeCoin[coin];
            } else {
                chargeCoin[10] = remainCharge !== 0 ? remainCharge / 10 : remainCharge;
            }
        });

        this.setIncreaseCashbox(chargeCoin, charge);
    }

    #getCoinAmount(remain, coin) {
        return remain >= coin ? Math.trunc(Math.random() * (remain / coin + 1)) : 0;
    }

    setIncreaseCashbox(coins, charge) {
        this.#setHaveCharge(charge);
        this.#setHaveCoins(coins);
    }

    #setHaveCharge(charge) {
        this.#haveCharge = this.#haveCharge + charge;
    }

    #setHaveCoins(chargeCoin) {
        Cashbox.COINS.forEach((coin) => {
            this.#haveCoins[coin] += chargeCoin[coin];
        });
    }

    setDecreaseCashbox(coins, charge) {
        this.#setDecreaseCharge(charge);
        this.#setDecreaseCoins(coins);
    }

    #setDecreaseCoins(coins) {
        Cashbox.COINS.forEach((coin) => {
            this.#haveCoins[coin] -= coins[coin];
        });
    }

    #setDecreaseCharge(charge) {
        this.#haveCharge = this.#haveCharge - charge;
    }

    get charge() {
        return this.#haveCharge;
    }

    get coins() {
        return this.#haveCoins;
    }
}
