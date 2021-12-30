export const CHANGE_VIEW = "CHANGE_VIEW";
export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const ADD_MACHINE_CHARGE = "ADD_MACHINE_CHARGE";
export const SUBTRACT_MACHINE_CHARGE = "SUBTRACT_MACHINE_CHARGE";
export const ADD_PURCHASE_CHARGE = "ADD_PURCHASE_CHARGE";
export const SUBTRACT_PURCHASE_CHARGE = "SUBTRACT_PURCHASE_CHARGE";

export const changeView = (payload) => ({
  type: CHANGE_VIEW,
  payload
});

export const addProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload
});

export const updateProduct = (payload) => ({
  type: UPDATE_PRODUCT,
  payload
});

export const addMachineCharge = (payload) => ({
  type: ADD_MACHINE_CHARGE,
  payload
});

export const subtractMachineCharge = (payload) => ({
  type: SUBTRACT_MACHINE_CHARGE,
  payload
});

export const addPurchaseCharge = (payload) => ({
  type: ADD_PURCHASE_CHARGE,
  payload
});

export const subtractPurchaseCharge = (payload) => ({
  type: SUBTRACT_PURCHASE_CHARGE,
  payload
});