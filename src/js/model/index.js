const INITIAL_STATE = {
  product: {
    name: '',
    price: 0,
    count: 0,
  },
  products: [],
};

const getLocalStorageData = () => {
  try {
    const storageData = localStorage.getItem('vending-machine-state');
    return JSON.parse(storageData);
  } catch (e) {
    console.error(e);
    return null;
  }
};

const model = (initialState = INITIAL_STATE) => {
  const state = initialState;

  const getState = () => {
    return getLocalStorageData() || state;
  };
};

export default model;
