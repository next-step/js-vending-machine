import VendingMachineCharge from "../domain/VendingMachineCharge.js";

export const PRODUCT_ID = "VENDING_MACHINE_PRODUCT";
export const CHARGE_ID = "VENDING_MACHINE_CHARGE";
export const COINS_ID = "VENDING_MACHINE_COINS";

export const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getProducts = () => {
    const productData = localStorage.getItem(PRODUCT_ID);
    return productData ? JSON.parse(productData) : [];
};

export const getCharge = () => {
    const chargeData = localStorage.getItem(CHARGE_ID);
    return chargeData ? Number(JSON.parse(chargeData)) : 0;
};

export const getCoins = () => {
    const coinsData = localStorage.getItem(COINS_ID);
    return coinsData ? JSON.parse(coinsData) : VendingMachineCharge.getInitCoins();
};
