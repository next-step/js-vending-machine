export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";
export const ADD_MACHINE_CHARGE = "ADD_MACHINE_CHARGE";

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
