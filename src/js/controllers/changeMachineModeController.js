import { viewStateTabsView, model } from '../index.js';
import { LOCAL_STORAGE_KEY } from '../constants/index.js';
import { getLocalStorageValueByKey } from '../service/localStorageService.js';
import { renderViewByMachineMode, setMachineMode } from '../service/changeMachineModeService.js';

export class changeMachineModeController {
  constructor() {
    viewStateTabsView.bindOnClickMachineModeTab(this.onClickMachineModeTab);
    renderViewByMachineMode(getLocalStorageValueByKey(LOCAL_STORAGE_KEY.MACHINE_MODE));
  }

  onClickMachineModeTab = ($targetValue) => {
    setMachineMode($targetValue.id);
    renderViewByMachineMode(model.machineMode);
  };
}
