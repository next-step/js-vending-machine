export const getParam = (key) => {
  const url = new URL(window.location.href);

  return url.searchParams.get(key);
};
