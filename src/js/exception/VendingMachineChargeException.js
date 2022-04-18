import VendingMachineCharge from "../domain/VendingMachineCharge.js";

export default class VendingMachineChargeException {
    static notExistCharge() {
        return new Error("충전 금액을 입력해주세요.");
    }

    static outOfRangeCharge() {
        return new Error(`잔돈 충전 금액 ${VendingMachineCharge.MIN_CHARGE}원이 최소 금액입니다.`);
    }

    static notMatchChargeUnit() {
        return new Error(`잔돈 충전 금액 ${VendingMachineCharge.CHARGE_UNIT}원 단위로 입력해야 합니다.`);
    }
}
