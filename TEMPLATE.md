## `자판기 잔돈(보유 금액) 충전 메뉴`

<img alt="스크린샷 2021-09-06 오전 11 21 19" src="https://user-images.githubusercontent.com/26598561/144754596-57219248-32d9-44d5-b266-b04853966a1e.png">

```html
<h3>자판기 돈통 충전하기</h3>
<div class="vending-machine-wrapper">
	<input type="number" name="vending-machine-charge-amount" id="vending-machine-charge-input" autofocus />
	<button id="vending-machine-charge-button">충전하기</button>
</div>
<p>보유 금액: <span id="vending-machine-charge-amount">0</span>원</p>
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
		<tr>
			<td>500원</td>
			<td id="vending-machine-coin-500-quantity"></td>
		</tr>
		<tr>
			<td>100원</td>
			<td id="vending-machine-coin-100-quantity"></td>
		</tr>
		<tr>
			<td>50원</td>
			<td id="vending-machine-coin-50-quantity"></td>
		</tr>
		<tr>
			<td>10원</td>
			<td id="vending-machine-coin-10-quantity"></td>
		</tr>
	</tbody>
</table>
```

## `상품 추가 메뉴`

<img alt="스크린샷 2021-09-06 오전 11 21 32" src="https://user-images.githubusercontent.com/26598561/144754627-d698d000-a15d-48c8-acc6-ab5181639b56.png">

```html
<h3>상품 추가하기</h3>
<div class="product-container">
	<input type="text" id="product-name-input" placeholder="상품명" />
	<input type="number" id="product-price-input" placeholder="가격" />
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
```

## `상품 구매 및 금액 충전 메뉴`

### `금액 충전`

<img alt="스크린샷 2021-09-06 오전 11 22 43" src="https://user-images.githubusercontent.com/26598561/144754665-1e510dcb-7299-45fb-8353-999a2dae6e9c.png">

```html
<div class="purchase-container">
	<h3>충전하기</h3>
	<div class="vending-machine-wrapper">
		<input type="number" name="charge-amount" id="charge-input" />
		<button id="charge-button">충전하기</button>
	</div>
	<p>충전 금액: <span id="charge-amount">0</span>원</p>
</div>
```

### `잔돈 반환`

<img alt="스크린샷 2021-09-06 오전 11 22 59" src="https://user-images.githubusercontent.com/26598561/144754672-8a2b6ecb-89bd-43a2-bcb7-c46cc6914d42.png">

```html
<h3>잔돈</h3>
<button id="coin-return-button">반환하기</button>
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
```
