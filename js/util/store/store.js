const store = {
  setCurrentTab(tab) {
    window.localStorage.setItem("tab", JSON.stringify(tab));
  },
  getCurrentTab() {
    return JSON.parse(window.localStorage.getItem("tab"));
  },
  setTabState(state) {
    window.localStorage.setItem("state", JSON.stringify(state));
  },
  getTabState() {
    return JSON.parse(window.localStorage.getItem("state"));
  },
  getCurrentTabState() {
    return this.getTabState()[this.getCurrentTab()];
  },
};

export default store;
