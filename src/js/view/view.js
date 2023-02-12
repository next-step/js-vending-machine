import {
  createTemplateElement,
  CONTAINER_TEMPLATES,
} from "../utils/templates.js";
import { $, $$ } from "../utils/selector.js";

class View {
  constructor(name) {
    this.name = name;
    this.template = CONTAINER_TEMPLATES[name];
    this.$app = document.querySelector("#app");
    this.$menuItem = $(`#menu button[name=${this.name}]`);
    this.$$buttons = $$("#menu button");
  }

  renderMenu() {
    this.$$buttons.forEach((button) => {
      button.classList.remove("active");
    });

    this.$menuItem.classList.add("active");
  }

  renderContent() {
    const { content } = createTemplateElement(this.template);

    this.$app.replaceChildren(content);
  }

  update() {
    console.error("not override update method");
  }

  render() {
    this.renderContent();
    this.renderMenu();
  }
}

export default View;
