export class Component {
  constructor(template) {
    this.template = template;
    this.render();
  }

  setEvent() {}

  updateView() {}

  render() {
    document.getElementById('app').innerHTML = this.template;
    this.setEvent();
    this.updateView();
  }
}
