export const testBody = /* html */ `
<button id="product-manage-menu" class="hash-nav">상품 관리</button>
	<button id="vending-machine-manage-menu" class="hash-nav">잔돈충전</button>
	<!-- <button id="product-purchase-menu" class="hash-nav">상품 구매</button> -->

	<div id="appending-product-container" class="contents-container">
		<h3>상품 추가하기</h3>
		<div class="product-container">
			<input type="text" id="product-name-input" placeholder="상품명" />
			<input type="number" id="product-price-input" placeholder="가격" step="10" />
			<input type="number" id="product-quantity-input" placeholder="수량" />
			<button id="product-add-button">추가하기</button>
		</div>
		<table class="product-inventory">
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
			<tbody id="product-inventory-container"></tbody>
		</table>
	</div>
	<div id="charging-money-container" class="contents-container">
		<div class="purchase-container">
			<h3>충전하기</h3>
			<form class="vending-machine-wrapper">
				<input type="number" name="charge-amount" id="charge-input" placeholder="충전할 금액을 입력해주세요" step="10" min="0" />
				<button id="charge-button">충전하기</button>
			</form>
			<p>충전 금액: <span id="charge-amount">0</span>원</p>
		</div>
		<!-- <h3>잔돈</h3> -->
		<!-- <button id="coin-return-button">반환하기</button> -->
		<table class="cashbox-change">
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
				<tr>
					<td>500원</td>
					<td id="coin-500-quantity"></td>
				</tr>
				<tr>
					<td>100원</td>
					<td id="coin-100-quantity"></td>
				</tr>
				<tr>
					<td>50원</td>
					<td id="coin-50-quantity"></td>
				</tr>
				<tr>
					<td>10원</td>
					<td id="coin-10-quantity"></td>
				</tr>
			</tbody>
		</table>
	</div>

`;
