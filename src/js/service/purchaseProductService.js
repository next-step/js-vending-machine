export const createPurchasableRowArray = (product, index) => {
  return [
    ...Object.values(product)
      .slice(1)
      .map((item) => `<th>${item}</th>`),
    '<th><button>구매하기</button></th>',
  ];
};
