const VENDING_MACHINE = 'VENDING_MACHINE';

const createStorage = (initialState = {}) => {
  const set = (value, key = VENDING_MACHINE) =>
    localStorage.setItem(key, JSON.stringify(value));

  const getAll = (key = VENDING_MACHINE) => {
    const data = localStorage.getItem(key);
    // if (!data) throw new Error('데이터가 없습니다.');

    return JSON.parse(data);
  };
  const get = (stateKey) => getAll()[stateKey];

  const remove = (key = VENDING_MACHINE) => localStorage.removeItem(key);

  getAll() ?? set(initialState);

  return {
    set,
    get,
    getAll,
    remove,
  };
};

export default createStorage;
