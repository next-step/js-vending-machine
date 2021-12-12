import {
  getLocalStorageItem,
  setLocalStorageItem,
} from '../utils/data/localStorage'

const VENDING_PRODUCT_KEY = 'vending_machine_product_key'

type ProductProps = { name: string; price: number; amount: number }

export default class ProductStore {
  #productMap
  #productList

  constructor() {
    this.#productMap = new Map<string, Omit<ProductProps, 'name'>>()
    const savedProducts: ProductProps[] =
      getLocalStorageItem({ key: VENDING_PRODUCT_KEY }) ?? []

    this.#productList = savedProducts

    savedProducts.forEach(({ name, price, amount }) => {
      this.#productMap.set(name, { price, amount })
    })
  }

  setProduct({ name, price, amount }: ProductProps): boolean {
    if (!this.isValidProduct({ name, price, amount })) {
      return false
    }

    const isDuplicated = !!this.#productMap.get(name)

    if (isDuplicated) {
      this.#productMap.set(name, { price, amount })
      this.#productList = this.#productList.filter(
        (product) => product.name !== name
      )
    }

    this.#productList.push({ name, price, amount })
    setLocalStorageItem({ key: VENDING_PRODUCT_KEY, value: this.#productList })

    return true
  }

  getProduct({ name }: { name: string }): null | ProductProps {
    const product = this.#productMap.get(name)

    if (!product) {
      return null
    }

    return { name, price: product.price, amount: product.amount }
  }

  isValidProduct({ name, price, amount }: ProductProps) {
    if (!name || !price || !amount) {
      return false
    }

    return amount % 10 === 0 ? true : false
  }
}
