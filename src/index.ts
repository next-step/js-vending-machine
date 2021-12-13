import './view/main.js'
import './view/productInventory/index.js'
import './view/machineCharge/index.js'
import './view/userPurchase/index.js'
import './view/userPurchase/chargeCoins.js'
import './view/userPurchase/returnChange.js'
import el from './util/dom.js'
import { connectStore } from './store/index.js'
import worker from './store/worker.js'
import { Actions } from './store/actions.js'

/* Render Dom with store */
;(() => {
  const $app = el('<vending-machine-app id="app"></vending-machine-app>')
  const store = connectStore($app, worker)
  store.dispatch(Actions.init)

  document.body.insertAdjacentElement('afterbegin', $app)
})()
