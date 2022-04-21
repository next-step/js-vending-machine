import AbstractView from './abstractView';

class ErrorPageView extends AbstractView<HTMLElement, string> {
  private errorMessage: string = '🚨 Not Found! 🚨';

  render(message = this.errorMessage) {
    super.render(message);
  }

  generateMarkup(message: string) {
    return /* html */ `
    <section class="error-page-section">
      <h2>
          <span>
            ${message}
          </span>
      </h2> 
    </section>
    `;
  }
}

export default new ErrorPageView();
