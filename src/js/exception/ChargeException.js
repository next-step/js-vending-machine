import Charge from "../domain/Charge.js";

export const chargeException = {
    notExistCharge() {
        return new Error("충전할 금액을 입력해주세요.");
    },
    notMatchChargeUnit() {
        return new Error(`충전 금액을 ${Charge.CHARGE_UNIT}원 단위로 입력해주세요.`);
    },
    outOfRangeCharge() {
        return new Error(`충전 금액을 ${Charge.CHARGE_MIN}원 이상 입력해주세요.`);
    },
};
