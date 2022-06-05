import { $getElement } from '../../dom.js';

export default function VendingMachineManage(target) {
  render();
  function render() {
    target.appendChild($getElement(template()));
  }

  function template() {
    return `<div></div>`;
  }
}
