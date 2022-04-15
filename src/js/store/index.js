import { STORE_KEY } from '../constants/store/index.js';

const initState = {
  productManagement: [],
};

const getState = () => {
  return JSON.parse(localStorage.getItem(STORE_KEY.PRIVATE));
};

const setState = ({ key, value }) => {
  localStorage.setItem(STORE_KEY.PRIVATE, JSON.stringify({ ...getState(), [key]: value }));
};

const init = () => {
  if (getState()) return;
  localStorage.setItem(STORE_KEY.PRIVATE, JSON.stringify(initState));
};

const reset = () => {
  localStorage.removeItem(STORE_KEY.PRIVATE);
  init();
};

const store = {
  getState,
  setState,
  reset,
  init,
};

export default store;
