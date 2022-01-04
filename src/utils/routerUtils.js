function push(tabName) {
  const url = new URL(window.location);
  url.searchParams.set('tab', tabName);
  window.history.pushState({}, '', url);
}

function resolve() {
  const url = new URL(window.location);
  return {
    url,
  };
}

export default {
  push,
  resolve,
};
