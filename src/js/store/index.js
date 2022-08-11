const store = {
  setCurrentTab(tab) {
    localStorage.setItem("tab", JSON.stringify(tab));
  },
  getCurrentTab() {
    return JSON.parse(localStorage.getItem("tab"));
  },

  setTabState(state) {
    localStorage.setItem("state", JSON.stringify(state));
  },
  getTabState() {
    return JSON.parse(localStorage.getItem("state"));
  },
};

export default store;
