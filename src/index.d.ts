declare interface Product {
  name: string;
  price: number;
  quantity: number;
}

declare type CoinKey = 'COIN_500' | 'COIN_100' | 'COIN_50' | 'COIN_10';
declare type CoinObj = {
  value: number;
  count: number;
};

declare interface State {
  products: Array<Product>;
  inputPrice: number;
  coins: Record<CoinKey, CoinObj>;
}

