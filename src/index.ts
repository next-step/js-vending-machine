import el from './util/dom.js'
import { connectStore } from './store/index.js'
import { Actions } from './store/actions.js'
import actionWorker from './store/actionWorker.js'
import './view/index.js'

/* Render Dom with store */
;(() => {
  const $app = el('<vending-machine-app id="app">')
  const store = connectStore($app, actionWorker)
  store.dispatch(Actions.init)

  document.body.insertAdjacentElement('afterbegin', $app)
})()
