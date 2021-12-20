import { $ } from "./util/index.js"
import VendingMachineApp from "./views/VendingMachineApp.js";

document.addEventListener('DOMContentLoaded', function () {
  const $elem = $("#app");
  if (!$elem) throw $elem;
  $elem.insertAdjacentHTML("beforeend", `<vending-machine-app></vending-machine-app>`);
})
