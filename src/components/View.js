import { $ } from '../utils/selector.js'

export default class View {
  constructor(app, props) {
    this.$app = $(app)
    this.props = props
  }
  template = () => {}
  bindEvent = () => {}
  render = () => {
    this.$app.replaceChildren()
    this.$app.insertAdjacentHTML('afterbegin', this.template())
  }
}
