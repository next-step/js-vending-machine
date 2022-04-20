export default abstract class AbstractView<T extends HTMLElement, U extends State> {
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

  renderError(message: string = 'Error Page') {
    const markup = this.generateMarkup(message);
    this.containerElement.insertAdjacentHTML('beforebegin', markup);
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
