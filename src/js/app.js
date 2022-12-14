import { STORAGE } from '../constants/index.js';
import model from './model/index.js';
import { setStorage } from './utils/storage.js';

class App {
  constructor({ $target }) {
    this.$target = $target;
    this.storeStateInWeb();
  }

  storeStateInToWeb() {
    window.addEventListener(
      'beforeunload',
      () => {
        setStorage({ id: STORAGE.KEY, value: model.state });
      },
      { capture: true }
    );
  }
}

export default App;
