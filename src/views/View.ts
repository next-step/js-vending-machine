import { $Root } from '../routes/router'

interface ViewInterface {
  viewId: string
  template: string
  selectDomElement(): void
  createTemplate(): DocumentFragment
  bindEvent(): void
  renderTemplate(): void
  render(): void
}

export default class View implements ViewInterface {
  viewId: string
  template: string
  bindEvent(): void {}

  createTemplate(): DocumentFragment {
    return document.createRange().createContextualFragment(this.template)
  }

  selectDomElement(): void {}

  renderTemplate(): void {
    const $template = this.createTemplate()
    $Root.replaceChildren($template)
    this.selectDomElement()
    this.bindEvent()
  }

  render(): void {
    this.renderTemplate()
  }
}
