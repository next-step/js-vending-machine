import { VENDING_MACHINE } from './constants/vending-machine-constant.js';

function isEmpty(value) {
  return value === undefined || value === null || value.trim() === '';
}

const VendingMachineManage = (function () {
  let totalChargeAmount = 0;

  function chargingAmount(amount) {
    totalChargeAmount += amount;
  }

  function validateChargeAmount(amount) {
    if (isEmpty(amount)) {
      throw new Error('충전금액은 필수값입니다.');
    }
    if (amount < VENDING_MACHINE.MIN_CHARGING_COIN) {
      throw new Error(
        `충전금액은 ${VENDING_MACHINE.MIN_CHARGING_COIN} 보다 커야됩니다.`
      );
    }

    if (amount % VENDING_MACHINE.STEP_CHARGING_COIN !== 0) {
      throw new Error(
        `충전금액은 ${VENDING_MACHINE.STEP_CHARGING_COIN} 단위여야 합니다.`
      );
    }
  }

  function handleChargingCoin(amount) {
    validateChargeAmount(amount);
    chargingAmount(Number(amount));
  }

  return {
    chargeAmount: () => totalChargeAmount,
    chargingCoin: handleChargingCoin,
  };
})();
export default VendingMachineManage;
