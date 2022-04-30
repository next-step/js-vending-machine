export default abstract class AbstractView<Element extends HTMLElement, Obj extends Object> {
  protected containerElement: Element;
  protected data!: Obj;

  constructor() {
    this.containerElement = document.querySelector('#app')! as Element;
  }

  render(data: Obj): void {
    this.clear();
    this.renderDiff(data);
  }

  isEverRendered() {
    return this.containerElement.querySelectorAll('*') === null;
  }

  renderDiff(data: Obj): void {
    const markup = this.generateMarkup(data);
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

  clear(): void {
    this.containerElement.replaceChildren();
  }

  generateMarkup(message: Obj): string {
    return /* html */ `
       <div>${message}</div>
     `;
  }
}
