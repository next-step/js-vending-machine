function getState(name) {
  return JSON.parse(localStorage.getItem(name));
}

function setState(name, state) {
  localStorage.setItem(name, JSON.stringify(state));
}

export default {
  getState,
  setState,
};
