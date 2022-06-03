import Store from '../store/index';
import { isPredicatedElement } from '../utils/predicator';

export default abstract class AbstractView {
  constructor(protected readonly store = Store) {
    store.dispatch('loadInitialState');
  }

  protected get containerElement () {
    return document.querySelector('#app');    
  }

  abstract getMarkup(data: unknown): string;
  abstract setEvent(): void;

  render(data: unknown) {
    this.clear();
    this.renderDiff(data);
  }

  isEverRendered() {
    if (!isPredicatedElement(this.containerElement)) return new Error('There is no container.');

    return this.containerElement.querySelectorAll('*') === null;
  }

  renderDiff(data: unknown) {
    if (!isPredicatedElement(this.containerElement)) return new Error('There is no container.');

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
    if (!isPredicatedElement(this.containerElement)) return new Error('There is no container.');

    this.containerElement.replaceChildren();
  }
}
