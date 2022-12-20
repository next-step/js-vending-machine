export const STOCK_CONTAINER = `
<div class="stock-container">
    <h3>상품 추가하기</h3>
    <div class="stock-inputs">
        <input type="text" id="stock-name-input" placeholder="상품명" />
        <input type="number" id="stock-price-input" placeholder="가격" />
        <input type="number" id="stock-quantity-input" placeholder="수량" />
        <button id="stock-add-button">추가하기</button>
    </div>
    <table class="stock-inventory">
        <colgroup>
            <col style="width: 140px" />
            <col style="width: 100px" />
            <col style="width: 100px" />
        </colgroup>
        <thead>
            <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
            </tr>
        </thead>
        <tbody id="stock-inventory-container"></tbody>
    </table>
</div>`;

export const RECHARGE_CONTAINER = `
<div class="recharge-container">
    <h3>자판기 돈통 충전하기</h3>
    <div class="recharge-wrapper">
        <input type="number" name="recharge-amount" id="recharge-input" autofocus />
        <button id="recharge-button">충전하기</button>
    </div>
    
    <p>보유 금액: <span id="recharge-amount"></span>원</p>
    
    <h3>동전 보유 현황</h3>
    <table class="recharge-cashbox-table">
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
        <tbody id="recharge-cashbox-container"></tbody>
    </table>
</div>
`;

//
// <tr>
//     <td>500원</td>
//     <td id="recharge-quantity-500"></td>
// </tr>
// <tr>
//     <td>100원</td>
//     <td id="recharge-quantity-100"></td>
// </tr>
// <tr>
//     <td>50원</td>
//     <td id="recharge-quantity-50"></td>
// </tr>
// <tr>
//     <td>10원</td>
//     <td id="recharge-quantity-10"></td>
// </tr>