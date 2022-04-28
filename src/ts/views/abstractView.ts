export default abstract class AbstractView<Element extends HTMLElement, Obj extends Object> {
  protected containerElement: Element;
  protected data!: Obj;

  constructor() {
    this.containerElement = document.querySelector('#app')! as Element;
  }

  render(data: Obj): void {
    this.clear();

    const markup = this.generateMarkup(data);
    this.containerElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear(): void {
    this.containerElement.innerHTML = '';
  }

  generateMarkup(message: Obj): string {
    return /* html */ `
       <div>${message}</div>
     `;
  }
}
