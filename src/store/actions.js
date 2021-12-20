export const ADD_PRODUCT = "ADD_PRODUCT";
export const UPDATE_PRODUCT = "UPDATE_PRODUCT";

export const addProduct = (payload) => ({
  type: ADD_PRODUCT,
  payload
});

export const updateProduct = (payload) => ({
  type: UPDATE_PRODUCT,
  payload
});
