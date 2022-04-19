export default class Menus {
    static PRODUCT_MANAGE = "product-manage-menu";
    static VENDING_MACHINE_MANAGE = "vending-machine-manage-menu";
    static PRODUCT_PURCHASE = "product-purchase-menu";

    constructor(props) {
        this.props = props;
        this.mounted();
    }

    mounted() {
        document.querySelector(`#${Menus.PRODUCT_MANAGE}`).addEventListener("click", this.props.onProductManage.bind());
        document
            .querySelector(`#${Menus.VENDING_MACHINE_MANAGE}`)
            .addEventListener("click", this.props.onVendingMachineManage.bind());
        document
            .querySelector(`#${Menus.PRODUCT_PURCHASE}`)
            .addEventListener("click", this.props.onProductPurchase.bind());
    }

    setSelectedMenu(menu) {}
}
