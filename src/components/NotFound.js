const template = /*html*/ `
<section id="not-found">
  <h1> 404🙄 </h1>
  <h2>
    <span>NOT</span> <span>FOUND</span>
  <h2>
</section>
`;

export default class NotFound extends HTMLElement {
  constructor() {
    super();

    this.insertAdjacentHTML('afterbegin', template);
  }
}

customElements.define('not-found', NotFound);
