export const getLocalStorageData = () => {
  try {
    const storageData = localStorage.getItem(STORAGE.KEY);
    return JSON.parse(storageData);
  } catch (e) {
    console.error(e);
    return null;
  }
};
