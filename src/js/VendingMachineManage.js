import { VENDING_MACHINE } from './constants/vending-machine-constant.js';

const COIN_LIST = [500, 100, 50, 10];

const LOCALSTORAGE_VENDING_MACHINE_MANAGE_KEY =
  'circlegivenVendingMachineManage';

const getChargeAmountFromLocalStorage = () =>
  JSON.parse(localStorage.getItem(LOCALSTORAGE_VENDING_MACHINE_MANAGE_KEY));

const updateChargeAmountFromLocalStorage = (amount) => {
  localStorage.setItem(LOCALSTORAGE_VENDING_MACHINE_MANAGE_KEY, amount);
};

const isEmpty = (value) =>
  value === undefined || value === null || value.trim() === '';

const shuffle = (list) => (list ?? []).sort(() => Math.random() - 0.5);

const VendingMachineManage = (() => {
  let totalChargeAmount = getChargeAmountFromLocalStorage() ?? 0;

  const updateChargeAmount = (amount) => {
    totalChargeAmount += Number(amount);
  };

  const chargeCoinList = () => {
    let remainChargeAmount = totalChargeAmount;
    return shuffle(COIN_LIST)
      .map((coin) => {
        const coinQuantity = Math.floor(remainChargeAmount / coin);
        remainChargeAmount -= coinQuantity * coin;
        return { name: coin, quantity: coinQuantity };
      }, [])
      .sort((prev, next) => next.name - prev.name);
  };

  const validateChargeAmount = (amount) => {
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
  };

  const handleChargingCoin = (amount) => {
    validateChargeAmount(amount);
    updateChargeAmount(amount);
    updateChargeAmountFromLocalStorage(totalChargeAmount);
  };

  return {
    chargeAmount: () => totalChargeAmount,
    chargeCoinList,
    chargingCoin: handleChargingCoin,
  };
})();
export default VendingMachineManage;
