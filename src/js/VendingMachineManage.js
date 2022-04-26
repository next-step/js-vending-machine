import { VENDING_MACHINE } from './constants/vending-machine-constant.js';

const COIN_LIST = [500, 100, 50, 10];

const LOCALSTORAGE_VENDING_MACHINE_MANAGE_KEY =
  'circlegivenVendingMachineManage';

function getChargeAmountFromLocalStorage() {
  return JSON.parse(
    localStorage.getItem(LOCALSTORAGE_VENDING_MACHINE_MANAGE_KEY)
  );
}

function updateChargeAmountFromLocalStorage(amount) {
  localStorage.setItem(LOCALSTORAGE_VENDING_MACHINE_MANAGE_KEY, amount);
}

function isEmpty(value) {
  return value === undefined || value === null || value.trim() === '';
}

const VendingMachineManage = (function () {
  let totalChargeAmount = getChargeAmountFromLocalStorage() ?? 0;

  function updateChargeAmount(amount) {
    totalChargeAmount += Number(amount);
  }

  function chargeCoinList() {
    let remainChargeAmount = totalChargeAmount;
    return COIN_LIST.reduce((result, coin) => {
      const coinQuantity = Math.floor(remainChargeAmount / coin);
      remainChargeAmount -= coinQuantity * coin;
      result.push({ name: coin, quantity: coinQuantity });
      return result;
    }, []);
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
    updateChargeAmount(amount);
    updateChargeAmountFromLocalStorage(totalChargeAmount);
  }

  return {
    chargeAmount: () => totalChargeAmount,
    chargeCoinList,
    chargingCoin: handleChargingCoin,
  };
})();
export default VendingMachineManage;
