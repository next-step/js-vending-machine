import './container.js'
import './view/app.js'
import './view/productInventory/index.js'
import './view/machineCharge/index.js'
import './view/userPurchase/index.js'
import './view/userPurchase/chargeCoins.js'
import './view/userPurchase/returnChange.js'

/*
  store와 view의 결합도를 최소화하기 위해 Container에서만 store의 존재를 알게끔 함.
  이에 따라 반드시 Container을 가장 먼저 초기화(import)해야 함.
*/

export default {}
