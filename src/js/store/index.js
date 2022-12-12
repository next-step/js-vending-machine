const store = {
  setCurrentTab(tab) {
    localStorage.setItem("tab", JSON.stringify(tab));
  },
  getCurrentTab() {
    return JSON.parse(localStorage.getItem("tab")) || "product-manage-menu";
  },

  setTabState(state) {
    localStorage.setItem("state", JSON.stringify(state));
  },
  getTabState() {
    return (
      JSON.parse(localStorage.getItem("state")) || {
        "product-manage-menu": {},
        "vending-machine-manage-menu": {},
        "product-purchase-menu": {},
      }
    );
  },
};

export default store;
