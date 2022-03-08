const KEYS = {
  PRODUCTS: 'products',
  CHANGES: 'changes'
}

const setProducts = (products) => {
  localStorage.setItem(KEYS.PRODUCTS, JSON.stringify(products));
}

const getProducts = () => {
  const productsStr = localStorage.getItem(KEYS.PRODUCTS);
  return productsStr ? JSON.parse(productsStr) : [];
}

const getInitialChanges = () => ([
  {
    won: 500,
    amount: 0
  },
  {
    won: 100,
    amount: 0
  },
  {
    won: 50,
    amount: 0
  },
  {
    won: 10,
    amount: 0
  }
]);

const setChanges = (changes) => {
  localStorage.setItem(KEYS.CHANGES, JSON.stringify(changes));
}

const getChanges = () => {
  const changesStr = localStorage.getItem(KEYS.CHANGES);
  return changesStr ? JSON.parse(changesStr) : getInitialChanges();
}

export {
  getProducts,
  setProducts,
  getInitialChanges,
  setChanges,
  getChanges
}