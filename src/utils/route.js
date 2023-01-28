export const getHashId = () => {
  const hashLocation = window.location.hash;

  return hashLocation.replace('#', '');
};
