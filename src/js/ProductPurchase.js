import { PURCHASE } from './constants/purchase-constant.js';
import ProductManage from './ProductManage.js';

const isEmpty = (value) =>
  value === undefined || value === null || value.trim() === '';

const ProductPurchase = (() => {
  let totalChargeAmount = 0;

  const updateChargeAmount = (amount) => {
    totalChargeAmount = amount;
  };

  const chargingAmount = (amount) => {
    updateChargeAmount(totalChargeAmount + Number(amount));
  };

  const subtractAmount = (price) => {
    updateChargeAmount(totalChargeAmount - Number(price));
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

  const validatePurchase = (price) => {
    if (totalChargeAmount - price < 0) {
      throw new Error('충전금액이 모자릅니다. 상품을 구매할수 없습니다.');
    }
  };

  const handleChargingAmount = (amount) => {
    validateChargeAmount(amount);
    chargingAmount(amount);
  };

  const handlePurchase = (product) => {
    validatePurchase(product.price);
    ProductManage.purchaseProduct(product.name);
    subtractAmount(product.price);
  };

  return {
    chargeAmount: () => totalChargeAmount,
    chargingAmount: handleChargingAmount,
    purchase: handlePurchase,
  };
})();
export default ProductPurchase;
