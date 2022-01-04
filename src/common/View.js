export default class View {
  constructor(props, defaultState) {
    const { $el } = props;
    this.$el = $el;
    this.components = {};
    this.state = defaultState;

    this.render();
    this.bindEvents();
  }

  setState(newState) {
    this.state = {
      ...this.state,
      ...newState,
    };

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
