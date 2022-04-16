interface ProductConfigContainer {
  readonly [prop: string]: number;
}

export const PRODUCT_CONFIG: ProductConfigContainer = {
  MIN_PRICE: 100,
  MIN_QUANTITY: 1,
  SHOULD_BE_DIVIDED: 10,
};
