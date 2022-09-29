class Storage {
  static setCurrentTab(tab) {
    localStorage.setItem('tab', tab);
  }

  static getCurrentTab() {
    return localStorage.getItem('tab');
  }
}

export default Storage;
