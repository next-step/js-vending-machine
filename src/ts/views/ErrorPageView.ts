import AbstractView from './abstractView';

class ErrorPageView extends AbstractView<HTMLElement, Error> {
  render(error: Error) {
    const markup = this.generateMarkup(error);
    this.clear();
    this.containerElement.insertAdjacentHTML('afterbegin', markup);
  }

  generateMarkup(error: Error) {
    return /* html */ `
            <h3>${error.message}</h3>
         `;
  }
}

export default new ErrorPageView();
