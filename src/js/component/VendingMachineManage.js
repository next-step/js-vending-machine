export default class VendingMachineManage {
    render() {
        document.querySelector("#app").innerHTML = this.#getTemplate();
    }

    #getTemplate() {
        return `<h3 id="vending-machine-manage">잔돈 충전</h3>`;
    }
}
