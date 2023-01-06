class MenuModel {
  constructor() {
    this.currentView = "manager";
  }

  changeView(view) {
    this.currentView = view;
  }
}

export default MenuModel;
