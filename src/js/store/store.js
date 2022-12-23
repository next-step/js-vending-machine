const INITIAL_STATE = {
  products: [],
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
