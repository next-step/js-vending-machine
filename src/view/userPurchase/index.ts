import View from '../abstract.js'

export default class userPurchase extends View {
  static #template = /* html */ `
    <fragment>
      <charge-coins></charge-coins>
      <product-list></product-list>
      <return-changes></return-changes>
    </fragment>
  `

  constructor() {
    super()
    this.render(userPurchase.#template)
  }
}

customElements.define('user-purchase', userPurchase)