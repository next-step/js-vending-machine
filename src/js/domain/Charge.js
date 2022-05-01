import { chargeException } from "../exception/ChargeException.js";
import { getChange } from "../service/index.js";
import Cashbox from "./Cashbox.js";

export default class Charge {
    #charge;
    #returnCoins;

    static CHARGE_MIN = 10;
    static CHARGE_UNIT = 10;

    constructor(cashbox) {
        this.#charge = getChange();
        this.cashbox = cashbox;
        this.#returnCoins = Cashbox.getInitCoins();
    }

    get value() {
        return this.#charge;
    }

    set value(charge) {
        this.#charge = charge;
    }

    get coins() {
        return this.#returnCoins;
    }

    onReturnChange() {
        let remain = this.#charge;
        let returnCoins = Cashbox.getInitCoins();

        Cashbox.COINS.map((coin) => {
            if (remain >= coin) {
                returnCoins[coin] = Math.min(this.cashbox.coins[coin], Math.trunc(remain / coin));
                remain = remain - returnCoins[coin] * coin;
                this.cashbox.coins[coin] = this.cashbox.coins[coin] - returnCoins[coin];
                this.#returnCoins[coin] = this.#returnCoins[coin] + returnCoins[coin];
            }
        });

        this.cashbox.setDecreaseCashbox(returnCoins, this.#charge);
        this.#charge = remain;
    }

    validate(charge) {
        if (!charge) {
            throw chargeException.notExistCharge();
        }

        if (charge % Charge.CHARGE_UNIT !== 0) {
            throw chargeException.notMatchChargeUnit();
        }

        if (charge < Charge.CHARGE_MIN) {
            throw chargeException.outOfRangeCharge();
        }
    }
}
