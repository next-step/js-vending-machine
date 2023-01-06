import { createTemplateElement, TEMPLATES } from "../utils/templates.js";

class View {
  #pages;
  constructor(name) {
    this.name = name;
    this.$app = document.querySelector("#app");
    this.template = TEMPLATES[name];
  }

  render() {
    const { content } = createTemplateElement(this.template);
    this.$app.replaceChildren(content);
  }
}

export default View;
