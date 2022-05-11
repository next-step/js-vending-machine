export default abstract class AbstractView<ViewElement extends HTMLElement> {
  protected containerElement: ViewElement;

  constructor() {
    this.containerElement = document.querySelector('#app')! as ViewElement;
  }

  abstract getMarkup(data: unknown): string;

  render(data: unknown) {
    this.clear();
    this.renderDiff(data);
  }

  isEverRendered() {
    return this.containerElement.querySelectorAll('*') === null;
  }

  renderDiff(data: unknown) {
    const markup = this.getMarkup(data);
    const newDom = document.createRange().createContextualFragment(markup);
    const newElements = Array.from(newDom.querySelectorAll('*'));
    const curElements = Array.from(this.containerElement.querySelectorAll('*'));

    if (!this.isEverRendered()) {
      this.containerElement.replaceChildren(newDom);
      return;
    }

    newElements.forEach((el, i) => {
      const curEl = curElements[i];
      if (!el.isEqualNode(curEl) && el.firstChild?.nodeValue.trim() !== '') {
        curEl.textContent = el.firstChild.textContent;
      }
    });
  }

  clear() {
    this.containerElement.replaceChildren();
  }
}
