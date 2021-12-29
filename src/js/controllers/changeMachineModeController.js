import { viewStateTabsView, model } from '../index.js';
import { setMachineMode } from '../service/changeMachineModeService.js';

export class changeMachineModeController {
  constructor() {
    viewStateTabsView.bindOnClickMachineModeTab(this.onClickMachineModeTab);
    viewStateTabsView.renderViewByMachineMode(model.machineMode);
  }

  onClickMachineModeTab = ($targetValue) => {
    setMachineMode($targetValue.id);
    viewStateTabsView.renderViewByMachineMode(model.machineMode);
  };
}
