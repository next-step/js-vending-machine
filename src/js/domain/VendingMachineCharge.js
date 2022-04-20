import { VendingMachineChargeException } from "../exception/VendingMachineChargeException.js";

export default class VendingMachineCharge {
    static MIN_CHARGE = 0;
    static CHARGE_UNIT = 10;
    static COINS = [500, 100, 50, 10];

    #haveCharge = 0;
    #haveCoins = VendingMachineCharge.getInitCoins();

    static validate(charge) {
        if (!charge) {
            throw VendingMachineChargeException.notExistCharge();
        }

        if (charge === VendingMachineCharge.MIN_CHARGE) {
            throw VendingMachineChargeException.outOfRangeCharge();
        }

        if (charge % VendingMachineCharge.CHARGE_UNIT !== 0) {
            throw VendingMachineChargeException.notMatchChargeUnit();
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
        let chargeCoin = VendingMachineCharge.getInitCoins();

        VendingMachineCharge.COINS.forEach((coin) => {
            if (coin !== 10) {
                chargeCoin[coin] = this.#getCoinAmount(remainCharge, coin);
                remainCharge = remainCharge - coin * chargeCoin[coin];
            } else {
                chargeCoin[10] = remainCharge !== 0 ? remainCharge / 10 : remainCharge;
            }
        });

        this.setHaveCoins(chargeCoin);
        this.setHaveCharge(charge);
    }

    #getCoinAmount(remain, coin) {
        return remain >= coin ? Math.trunc(Math.random() * (remain / coin + 1)) : 0;
    }

    setHaveCharge(charge) {
        this.#haveCharge += charge;
    }

    setHaveCoins(chargeCoin) {
        VendingMachineCharge.COINS.forEach((coin) => {
            this.#haveCoins[coin] += chargeCoin[coin];
        });
    }

    get charge() {
        return this.#haveCharge;
    }

    get coins() {
        return this.#haveCoins;
    }
}
