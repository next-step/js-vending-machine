const INITIAL_STATE = {
  products: [],
  totalMoney: 0,
  coins: {
    500: 0,
    100: 0,
    50: 0,
    10: 0,
  },
};

const store = (() => {
  let state = {};
  return {
    setState: newState => {
      state = newState;
      console.log(state);
    },
    getState: () => state,
  };
})();

store.setState(INITIAL_STATE);

export default store;
