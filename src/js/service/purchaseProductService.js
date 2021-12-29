export const createPurchasableRowArray = (product, index) => [
  ...Object.values(product)
    .slice(1)
    .map((item) => `<th>${item}</th>`),
  '<th><button>구매하기</button></th>',
];

export const validatePurchasable = (chargedAmount, product) => {
  if (chargedAmount < product.price) throw Error('돈이 부족');
  if (product.quantity <= 0) throw Error('수량 부족');
};
