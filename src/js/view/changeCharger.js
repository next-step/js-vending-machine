import View from "./view.js";
import { $, $$ } from "../utils/selector.js";
import { clearForm } from "../utils/utils.js";

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

  update(newState) {
    this.renderHoldingAmount(newState.totalAmount);
    this.renderInventory(newState.coinCounts);
    clearForm("#coin-charging-form");
  }

  render(currentState) {
    super.render();
    this.renderHoldingAmount(currentState.totalAmount);
    this.renderInventory(currentState.coinCounts);
  }
}
export default ChangeChargerView;
