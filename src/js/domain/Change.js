import { ChangeException } from "../exception/ChangeException.js";

export default class Change {
    #change;

    static CHARGE_MIN = 10;
    static CHARGE_UNIT = 10;

    constructor() {
        this.#change = 0;
    }

    get value() {
        return this.#change;
    }

    set value(charge) {
        this.#change = this.#change + charge;
    }

    validate(charge) {
        if (!charge) {
            throw ChangeException.notExistCharge();
        }

        if (charge % Change.CHARGE_UNIT !== 0) {
            throw ChangeException.notMatchChargeUnit();
        }

        if (charge < Change.CHARGE_MIN) {
            throw ChangeException.outOfRangeCharge();
        }
    }
}
