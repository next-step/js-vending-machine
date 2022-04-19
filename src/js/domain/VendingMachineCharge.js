import VendingMachineChargeException from "../exception/VendingMachineChargeException.js";

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
        let amount = 0;
        let chargeCoin = VendingMachineCharge.getInitCoins();

        VendingMachineCharge.COINS.forEach((coin) => {
            amount = 0;

            if (remainCharge >= coin) {
                if (coin !== 10) {
                    amount = Math.trunc(Math.random() * (remainCharge / coin + 1));
                } else {
                    amount = remainCharge / coin;
                }
                chargeCoin[coin] = amount;
                remainCharge = remainCharge - coin * amount;
            }
        });

        this.setHaveCoins(chargeCoin);
        this.setHaveCharge(charge);
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
