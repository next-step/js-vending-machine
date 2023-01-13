import View from "./view.js";
import { $, $$ } from "../utils/selector.js";

class ChangeChargerView extends View {
  constructor() {
    super("charger");
  }

  renderHoldingAmount(amount) {
    const $holdingAmount = $("#holding-amount");
    $holdingAmount.innerText = amount;
  }

  renderInventory(counts) {
    const $$coinAmounts = $$(".coin-amount");

    $$coinAmounts.forEach((coinAmount) => {
      const parentTrId = coinAmount.closest("tr").getAttribute("id");
      const unit = parentTrId.replace("coin-", "");

      coinAmount.innerText = `${counts[unit]}개`;
    });
  }

  clearForm() {
    const $chargerInput = $("#coin-charging-form .charger-input");
    $chargerInput.value = "";
    $chargerInput.focus();
  }

  update(newState) {
    this.renderHoldingAmount(newState.totalAmount);
    this.renderInventory(newState.coinCounts);
    this.clearForm();
  }
}
export default ChangeChargerView;
