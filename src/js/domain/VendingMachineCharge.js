import VendingMachineChargeException from "../exception/VendingMachineChargeException.js";

export default class VendingMachineCharge {
    static MIN_CHARGE = 0;
    static CHARGE_UNIT = 10;

    COINS = {
        10: 0,
        50: 0,
        100: 0,
        500: 0,
    };

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
}
