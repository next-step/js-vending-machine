const INITIAL_STATE = {
  products: [],
  totalMoney: 0,
  coins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
  inputMoney: 0,
  returnCoins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
};

export function setItem(key, value) {
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
  }
}

export function getItem(key) {
  try {
    const value = localStorage.getItem(key);
    return value ? JSON.parse(value) : INITIAL_STATE;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error.message);
    }
    return [];
  }
}
