import VendingMachineController from './controllers/VendingMachineController.js';

class VendingMachine {
  constructor() {
    this.vendingMachineController = new VendingMachineController();
  }

  run() {
    this.vendingMachineController.run();
  }
}

const vendingMachine = new VendingMachine();
vendingMachine.run();
