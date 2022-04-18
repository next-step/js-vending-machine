export default class Menus {
    constructor(props) {
        this.props = props;
        this.mounted();
    }

    mounted() {
        document.querySelector("#product-manage-menu").addEventListener("click", () => this.props.onProductManage());
        document
            .querySelector("#vending-machine-manage-menu")
            .addEventListener("click", () => this.props.onVendingMachineManage());
        document
            .querySelector("#product-purchase-menu")
            .addEventListener("click", () => this.props.onProductPurchase());
    }
}
