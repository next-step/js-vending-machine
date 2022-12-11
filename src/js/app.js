import { initialRoutes } from './route.js';

class App {
  constructor({ $target }) {
    this.$target = $target;
    initialRoutes({ el: $target });
  }
}

export default App;
