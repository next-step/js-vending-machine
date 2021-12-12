function sayHi() {
  console.log('hi')
}

sayHi()

if (module.hot) {
  module.hot.accept()
}
