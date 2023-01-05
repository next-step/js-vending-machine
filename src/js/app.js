import VendingMachineController from "./controller/vendingMachine.js";

const INITIAL_STATE = {
  currentView: "manager", // manager, purchase, charger
};
class VendingMachineApp {
  #state;
  #controller;

  constructor() {
    this.#state = INITIAL_STATE;
  }

  initialize() {
    this.#controller = new VendingMachineController(this.#state);
  }
}

const vendingMachine = new VendingMachineApp();

vendingMachine.initialize();
