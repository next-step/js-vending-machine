import { INITIAL_STATE } from '../../constants/index.js';
import { getLocalStorageData } from '../../js/utils/index.js';

const model = (initialState = INITIAL_STATE) => {
  const state = initialState;

  const getState = () => {
    return getLocalStorageData() || state;
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

export default model();
