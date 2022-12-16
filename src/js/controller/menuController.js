export default class MenuController {
  constructor({ model, view }) {
    this.model = model;
    this.view = view;
    this.view.bindMenuEvent(this.handleMenuButton);
  }

  handleMenuButton = (event) => {
    const { id: hashId } = event.target;
    this.model.modifyHashId({ hashId });

    this.view.renderTab({ tabId: this.model.state.hashId });
  };
}
