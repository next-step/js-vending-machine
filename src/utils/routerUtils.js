function getHash() {
  const url = new URL(window.location);
  const hash = url.hash.split('#')[1] || '';

  return hash;
}

function bindOnpopstate(callback) {
  window.addEventListener('popstate', (event) => {
    const tabName = getHash();
    callback(tabName);
  });
}

function push(tabName) {
  const url = new URL(window.location);
  url.hash = tabName;
  window.history.pushState({}, '', url);
}

function resolve() {
  const url = new URL(window.location);
  return {
    url,
    hash: getHash(),
  };
}

export default {
  bindOnpopstate,

  push,
  resolve,
};
