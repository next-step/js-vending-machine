import localStorageUtils from '../utils/localStorageUtils.js';

export default class View {
  constructor(props, defaultState) {
    const { $el, name } = props;
    this.$el = $el;
    this.name = name;
    this.components = {};
    this.state = localStorageUtils.getState(name) || defaultState;

    this.render();
    this.bindEvents();
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

    localStorageUtils.setState(this.name, this.state);

    this.render();
  }

  render() {
    /**
     * childView
     */
  }

  bindEvents() {
    /**
     * childView
     */
  }
}
