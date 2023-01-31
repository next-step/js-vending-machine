import {
  createTemplateElement,
  CONTAINER_TEMPLATES,
} from "../utils/templates.js";

class View {
  constructor(name) {
    this.name = name;
    this.$app = document.querySelector("#app");
    this.template = CONTAINER_TEMPLATES[name];
  }

  render() {
    const { content } = createTemplateElement(this.template);
    this.$app.replaceChildren(content);
  }
}

export default View;
