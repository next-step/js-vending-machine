import AbstractView from './abstractView';

class ErrorPageView extends AbstractView<HTMLElement, string> {
  private errorMessage: string = '🚨 존재하지 않는 페이지입니다! 🚨';

  render(message = this.errorMessage) {
    super.render(message);
  }

  generateMarkup(message: string) {
    return /* html */ `
            <h3>${message}</h3>
    `;
  }
}

export default new ErrorPageView();
