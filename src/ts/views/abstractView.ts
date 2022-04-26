export default abstract class AbstractView<T extends HTMLElement, U extends Object> {
  protected containerElement: T;
  protected data!: U;

  constructor() {
    this.containerElement = document.querySelector('#app')! as T;
  }

  render(data: U): void {
    this.clear();

    const markup = this.generateMarkup(data);
    this.containerElement.insertAdjacentHTML('afterbegin', markup);
  }

  renderError(errMsg: string = 'ERROR'): void {
    const markup = `<h2>${errMsg}</h2>`;
    this.clear();
    this.containerElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear(): void {
    this.containerElement.innerHTML = '';
  }

  generateMarkup(message: U): string {
    return /* html */ `
      <div>${message}</div>
    `;
  }
}