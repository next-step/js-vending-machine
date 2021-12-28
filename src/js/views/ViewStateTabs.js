import { DOM, LOCAL_STORAGE_KEY } from '../constants/index.js';
import { $ } from '../utils/utils.js';
import { getLocalStorageValueByKey } from '../service/localStorageService.js';

export class ViewStateTabs {
  constructor() {
    this.$container = $(DOM.VIEW_STATE_TABS_CONTAINER);
  }

  bindOnClickMachineModeTab(handler) {
    this.$container.addEventListener('click', ({ target: value }) => {
      handler(value);
    });
  }
}
