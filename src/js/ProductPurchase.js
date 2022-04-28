import { PURCHASE } from './constants/purchase-constant.js';

const isEmpty = (value) =>
  value === undefined || value === null || value.trim() === '';

const ProductPurchase = (() => {
  let totalChargeAmount = 0;

  const updateChargeAmount = (amount) => {
    totalChargeAmount += Number(amount);
  };

  const validateChargeAmount = (amount) => {
    if (isEmpty(amount)) {
      throw new Error('충전금액은 필수값입니다.');
    }
    if (amount < PURCHASE.MIN_CHARGING_COIN) {
      throw new Error(
        `충전금액은 ${PURCHASE.MIN_CHARGING_COIN} 보다 커야됩니다.`
      );
    }

    if (amount % PURCHASE.STEP_CHARGING_COIN !== 0) {
      throw new Error(
        `충전금액은 ${PURCHASE.STEP_CHARGING_COIN} 단위여야 합니다.`
      );
    }
  };

  const handleChargingAmount = (amount) => {
    validateChargeAmount(amount);
    updateChargeAmount(amount);
  };

  return {
    chargeAmount: () => totalChargeAmount,
    chargingAmount: handleChargingAmount,
  };
})();
export default ProductPurchase;
