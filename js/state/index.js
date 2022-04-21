import createStorage from '../utils/storage.js';

const createStore = (initialState) => {
  const storage = createStorage(initialState);

  const listeners = [];

  const getState = (key) => (key ? storage.get(key) : storage.getAll());

  const dispatch = (newState) => {
    const prevState = storage.getAll();
    storage.set({
      ...prevState,
      ...newState,
    });

    listeners.forEach((listener) => listener(storage.getAll()));
  };

  const subscribe = (listener) => {
    listeners.push(listener);
  };

  return {
    getState,
    dispatch,
    subscribe,
  };
};

export default createStore;
