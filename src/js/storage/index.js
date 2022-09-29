class Storage {
  static setCurrentTab(tab) {
    localStorage.setItem('tab', tab);
  }

  static getCurrentTab() {
    return localStorage.getItem('tab');
  }

  static setStateData(state) {
    localStorage.setItem('state', JSON.stringify(state));
  }

  static getStateData() {
    return (
      JSON.parse(localStorage.getItem('state')) || {
        'product-manage-menu': {},
        'vending-machine-manage-menu': {},
        'product-purchase-menu': {},
      }
    );
  }
}

export default Storage;
