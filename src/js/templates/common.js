import { MENU_BUTTONS, TITLE } from '../constants/common.js';
import SELECTOR from '../constants/selector.js';

export const vendingMachineTitleTemplate = `<h1>${TITLE.MAIN}</h1>`;

export const createMenuButtonTemplate = (id, text) => `
  <button id="${id}">${text}</button>
`;

export const menuButtonContainerTemplate = `
  <div id="${SELECTOR.tabButtonContainerId}">
    ${MENU_BUTTONS.map(button => createMenuButtonTemplate(button.id, button.text)).join('')}
  </div>
`;

export const tabContentsContainerTemplate = `
  <div id="${SELECTOR.tabContentContainerId}"></div>
`;

export const createTableTh = (text) => `
  <th>${text}</th>
`;