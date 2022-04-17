export default class VendingMachineManage {
    constructor() {}

    render() {
        document.querySelector("#app").innerHTML = this.#getTemplate();
    }

    #getTemplate() {
        return `<h3>잔돈 충전</h3>`;
    }
}
