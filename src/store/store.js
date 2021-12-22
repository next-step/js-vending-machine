import { observable } from "../core/observer.js";
import { setLocalStorage } from "../util/localStorage.js";

export const createStore = (reducer) => {
  const state = observable(reducer());

  const currentState = {};

  Object.keys(state).forEach(key => {
    Object.defineProperty(currentState, key, {
      get: () => state[key]
    })
  });

  const dispatch = action => {
    const newState = reducer(currentState, action);
    for (const [key, value] of Object.entries(newState)) {
      if (!state[key]) continue;
      state[key] = value;
      setLocalStorage(key, value);
    }
  }

  const getState = () => {
    return currentState
  };

  return {
    getState,
    dispatch
  }
}
