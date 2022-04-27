import { changeException } from "../exception/ChangeException.js";
import { getChange } from "../service/index.js";

export default class Change {
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
        this.#change = this.#change + charge;
    }

    validate(charge) {
        if (!charge) {
            throw changeException.notExistCharge();
        }

        if (charge % Change.CHARGE_UNIT !== 0) {
            throw changeException.notMatchChargeUnit();
        }

        if (charge < Change.CHARGE_MIN) {
            throw changeException.outOfRangeCharge();
        }
    }
}
