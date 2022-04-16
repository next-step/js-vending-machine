export default abstract class AbstractView<T extends HTMLElement, U extends Object> {
  protected parentElement: T;
  protected data!: U;

  constructor() {
    this.parentElement = document.querySelector('#app')! as T;
  }

  render(data: U): void {
    this.clear();

    const markup = this.generateMarkup(data);
    this.parentElement.insertAdjacentHTML('afterbegin', markup);
  }

  clear(): void {
    this.parentElement.innerHTML = '';
  }

  generateMarkup(data: U): string {
    return /* html */ `
      <div>Error Page</div>
    `;
  }
}
