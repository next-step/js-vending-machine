import { Router } from './routes/router'

new Router()

if (module.hot) {
  module.hot.accept()
}
