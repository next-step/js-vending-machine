import { toNumber } from "../utils/utils.js";

export function Product({ name, price, quantity }) {
  this.name = name;
  this.price = toNumber(price);
  this.quantity = toNumber(quantity);
}
