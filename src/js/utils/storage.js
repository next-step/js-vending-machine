export const getStorage = ({ id }) => {
  try {
    return JSON.parse(localStorage.getItem(id));
  } catch (e) {
    console.error(e);
    return null;
  }
};

export const setStorage = ({ id, value }) => {
  try {
    localStorage.setItem(id, JSON.stringify(value));
  } catch (e) {
    console.error(e);
  }
};
