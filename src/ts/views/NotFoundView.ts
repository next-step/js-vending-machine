import AbstractView from './abstractView';

class NotFoundView extends AbstractView<HTMLElement, string> {
  private errorMessage: string = '🚨 Not Found! 🚨';

  render() {
    super.render(this.errorMessage);
  }

  generateMarkup(message: string) {
    return /* html */ `
    <section class="error-page-section">
      <h2>
          <span>
            ${message}
          </span>
      </h2> 
      <a href="#">Home</a>
    </section>
    `;
  }
}

export default new NotFoundView();
