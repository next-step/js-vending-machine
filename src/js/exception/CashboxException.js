import Cashbox from "../domain/Cashbox.js";

export const cashboxException = {
    notExistCharge() {
        return new Error("충전 금액을 입력해주세요.");
    },

    outOfRangeCharge() {
        return new Error(`잔돈 충전 금액 ${Cashbox.MIN_CHARGE}원이 최소 금액입니다.`);
    },

    notMatchChargeUnit() {
        return new Error(`잔돈 충전 금액 ${Cashbox.CHARGE_UNIT}원 단위로 입력해야 합니다.`);
    },

    notExistProductQuantity() {
        return new Error(`상품 품절`);
    },

    insufficlentCharge() {
        return new Error(`잔액 부족`);
    },
};
