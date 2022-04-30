import { chargeException } from "../exception/ChargeException.js";
import { getChange } from "../service/index.js";

export default class Charge {
    #change;

    static CHARGE_MIN = 10;
    static CHARGE_UNIT = 10;

    constructor() {
        this.#change = getChange();
    }

    get value() {
        return this.#change;
    }

    set value(charge) {
        this.#change = charge;
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
