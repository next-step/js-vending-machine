import { INITIAL_STATE } from '../../constants/index.js';

const veningMachineModel = (initialState = INITIAL_STATE) => {
  let state = initialState;

  const getState = () => {
    return state;
  };

  const setState = (newState) => {
    state = newState;
  };
  return {
    state,
    getState,
    setState,
  };
};

export default veningMachineModel();
