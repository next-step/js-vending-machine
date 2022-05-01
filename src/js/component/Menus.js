export default class Menus {
    static PRODUCT_MANAGE = "product-manage-menu";
    static VENDING_MACHINE_MANAGE = "vending-machine-manage-menu";
    static PRODUCT_PURCHASE = "product-purchase-menu";

    props;
    selectedMenu;

    constructor(props) {
        this.props = props;
        this.mounted();

        
        this.#setSelectedMenu(Menus.PRODUCT_MANAGE);
    }

    mounted() {
        document.querySelector("#menu-button-area").addEventListener("click", (event) => this.#onClickButton(event))
    }

    #onClickButton(event) {
        switch(event.target.id) {
            case Menus.PRODUCT_MANAGE: {
                this.#setSelectedMenu(event.target.id);
                this.props.onProductManage();
                break;
            }

            case Menus.VENDING_MACHINE_MANAGE: {
                this.#setSelectedMenu(event.target.id);
                this.props.onVendingMachineManage();
                break;
            }

            case Menus.PRODUCT_PURCHASE: {
                this.#setSelectedMenu(event.target.id);
                this.props.onProductPurchase();
                break;
            }
        }
    }
    #setSelectedMenu(event) { 
        if(!this.selectedMenu) this.selectedMenu = Menus.PRODUCT_MANAGE;
        document.querySelector(`#${this.selectedMenu}`).classList.remove("selected");
        this.selectedMenu = event;
        document.querySelector(`#${this.selectedMenu}`).classList.add("selected");
    }
}
