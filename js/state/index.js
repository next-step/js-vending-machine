
const createStore = (initialState) => {
  getAll() ?? setStorage(initialState);

  const listeners = [];

  const getState = (key) => (key ? get(key) : getAll());

  const dispatch = (newState) => {
    const prevState = getAll();

    setStorage({
      ...prevState,
      ...newState,
    });

    listeners.forEach((listener) => listener());
  };

  const subscribe = (listener) => listeners.push(listener);

  return {
    getState,
    dispatch,
    subscribe,
  };
};

export default createStore;

const VENDING_MACHINE = 'VENDING_MACHINE';

const setStorage = (value, key = VENDING_MACHINE) =>
    localStorage.setItem(key, JSON.stringify(value));

const getAll = (key = VENDING_MACHINE) => {
  const data = localStorage.getItem(key);
  // if (!data) throw new Error('데이터가 없습니다.');

  return JSON.parse(data);
};
const get = (stateKey) => getAll()[stateKey];

const remove = (key = VENDING_MACHINE) => localStorage.removeItem(key);
