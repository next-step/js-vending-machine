import VendingMachineCharge from "../domain/VendingMachineCharge.js";

export const PRODUCT_ID = "VENDING_MACHINE_PRODUCT";
export const CHARGE_ID = "VENDING_MACHINE_CHARGE";

export const setLocalStorage = (key, data) => {
    localStorage.setItem(key, JSON.stringify(data));
};

export const getProducts = () => {
    const productData = localStorage.getItem(PRODUCT_ID);
    return productData ? JSON.parse(productData) : [];
};

export const getCharge = () => {
    const chargeData = localStorage.getItem(CHARGE_ID);
    return productData ? JSON.parse(productData) : VendingMachineCharge.getInitCoins;
};
