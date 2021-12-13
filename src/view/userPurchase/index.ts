import View from '../../core/view.js'

export default class userPurchase extends View {
  static #template = /* html */ `
    <fragment>
      <charge-coins></charge-coins>
      <return-changes></return-changes>
    </fragment>
  `

  constructor() {
    super()
    this.render(userPurchase.#template)
  }
}

customElements.define('user-purchase', userPurchase)
