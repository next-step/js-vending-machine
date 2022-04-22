import VendingMachineCharge from "../domain/VendingMachineCharge.js";

export default class VendingMachineManage {
    constructor(vendingMachineCharge, props) {
        this.vendingMachineCharge = vendingMachineCharge;
        this.props = props;
    }
    setVendingMachineManage() {
        this.#render();
        this.#mounted();
    }

    #render() {
        document.querySelector("#app").replaceChildren();
        document.querySelector("#app").insertAdjacentHTML("afterbegin", this.#getTemplate());
    }

    #mounted() {
        document
            .querySelector("#vending-machine-charge-button")
            .addEventListener("click", () => this.#onSubmitVendingMachineCharge());
    }

    #onSubmitVendingMachineCharge() {
        this.props.onVendingMachine(document.querySelector("#vending-machine-charge-input").value);
    }

    onSetVendingMachine() {
        this.#setHaveCharge();
        this.#setHaveCoins();
    }

    #setHaveCharge() {
        document.querySelector("#vending-machine-charge-amount").replaceChildren();
        document
            .querySelector("#vending-machine-charge-amount")
            .insertAdjacentText("afterbegin", this.vendingMachineCharge.charge);
    }

    #setHaveCoins() {
        let amount = 0;

        VendingMachineCharge.COINS.forEach((coin) => {
            amount = this.vendingMachineCharge.coins[coin];
            if (amount !== 0) {
                document.querySelector(`#vending-machine-coin-${coin}-quantity`).innerHTML = `${amount}개`;
            } else {
                document.querySelector(`#vending-machine-coin-${coin}-quantity`).innerHTML = "";
            }
        });
    }

    #getTemplate() {
        return `
        <h3 id="vending-machine-manage">자판기 돈통 충전하기</h3>
        <div class="vending-machine-wrapper">
            <form id="vending-machine-charge-form">
                <input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
                <button id="vending-machine-charge-button">충전하기</button>
            </form>
        </div>
        <p>보유 금액: <span id="vending-machine-charge-amount">${this.vendingMachineCharge.charge}</span>원</p>
        <h3>동전 보유 현황</h3>
        <table class="cashbox-remaining">
            <colgroup>
                <col />
                <col />
            </colgroup>
            <thead>
                <tr>
                    <th>동전</th>
                    <th>개수</th>
                </tr>
            </thead>
            <tbody>
                ${VendingMachineCharge.COINS.map((coin) => this.#getCoinTemplate(coin)).join("")}
            </tbody>
        </table>
        `;
    }

    #getCoinTemplate(coin) {
        return `
            <tr>
                <td>${coin}원</td>
                <td id="vending-machine-coin-${coin}-quantity">
                ${this.vendingMachineCharge.coins[coin] === 0 ? "" : this.vendingMachineCharge.coins[coin] + "개"}
                </td>
            </tr>
        `;
    }
}
