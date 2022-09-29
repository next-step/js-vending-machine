class VendingMachineManageMenu {
  constructor($app) {
    this.app = $app;
    this.initRenderer();
  }

  initRenderer() {
    this.app.innerHTML = `
    <h3>자판기 돈통 충전하기</h3>
    `;
  }
}
export default VendingMachineManageMenu;
