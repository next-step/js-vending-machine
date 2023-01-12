export const PRODUCT_MANAGER_TEMPLATE = `<div id="product-manager-container">
  <section class="mb-10">
    <h2 class="mb-5 text-2xl font-bold">상품 추가하기</h2>
    <form id="product-manager-form" class="flex">
      <div class="flex shrink justify-between">
        <input
          type="text"
          class="product-input"
          name="name"
          placeholder="상품명"
          required
        />
        <input
          type="number"
          name="price"
          class="product-input"
          placeholder="가격"
          min="0"
          required
        />
        <input
          type="number"
          name="quantity"
          class="product-input"
          placeholder="수량"
          min="0"
          required
        />
      </div>
      <button
        type="submit"
        id="product-add-button"
        class="ml-3 shrink-0 border px-3 py-1"
      >
        +
      </button>
    </form>
  </section>
  <section>
    <h2 class="mb-5 text-2xl font-bold">상품 현황</h2>
    <table
      id="product-inventory"
      class="w-full overflow-hidden rounded-md border bg-slate-100"
    >
      <thead>
        <tr class="border-slate-100 bg-slate-600 text-white">
          <th class="py-1 w-1/3 font-normal">상품명</th>
          <th class="border-l w-1/3 py-2 font-normal">가격</th>
          <th class="border-l w-1/3 py-2 font-normal">수량</th>
        </tr>
      </thead>
      <tbody id="product-inventory-container"></tbody>
    </table>
  </section>
  </div>`;

export const createProductInventoryItem = ({
  name,
  price,
  quantity,
}) => `<tr class="border-t">
  <td class="py-2 text-center">${name}</td>
  <td class="py-2 border-l text-center">${price}</td>
  <td class="py-2 border-l text-center">${quantity}</td>
</tr>`;

export const COIN_CHARGING_TEMPLATE = `<div id="coin-charging-container">
  <section class="mb-10">
    <h2 class="mb-5 text-left text-2xl font-bold">
      자판기 동전 충전하기
    </h2>
    <form id="coin-charging-form" class="flex justify-center">
      <div class="flex shrink w-full">
        <input
          type="number"
          class="charger-input"
          name="product-quantity"
          placeholder="자판기가 보유할 금액"
          min="0"
        />
      </div>
      <button
        type="submit"
        id="product-add-button"
        class="ml-3 shrink-0 border px-3 py-1"
      >
        충전하기
      </button>
    </form>
    <p
      class="mx-auto mt-8 box-border w-8/12 rounded-xl border border-2 border-dashed p-3 text-center"
    >
      보유 금액: <span id="holding-amount" class="inline-block">0</span>원
    </p>
  </section>
  <section>
    <h2 class="mb-5 text-2xl font-bold">자판기가 보유한 동전</h2>
    <table
      id="coin-inventory"
      class="w-full overflow-hidden rounded-md border bg-slate-100"
    >
      <thead>
        <tr class="border-slate-100 bg-slate-600 text-white">
          <th class="w-1/2 py-2 font-normal">동전</th>
          <th class="w-1/2 border-l py-2 font-normal">개수</th>
        </tr>
      </thead>
      <tbody id="product-inventory-container">
        <tr class="border-t">
          <td class="py-1 text-center">
            <span class="coin-standard">500</span>원
          </td>
          <td class="border-l py-2 text-center">
            <span class="coin-amount">0</span>
          </td>
        </tr>
        <tr class="border-t">
          <td class="py-2 text-center">
            <span class="coin-standard">100</span>원
          </td>
          <td class="border-l py-2 text-center">
            <span class="coin-amount">0</span>
          </td>
        </tr>
        <tr class="border-t">
          <td class="py-2 text-center">
            <span class="coin-standard">50</span>원
          </td>
          <td class="border-l py-2 text-center">
            <span class="coin-amount">0</span>
          </td>
        </tr>
        <tr class="border-t">
          <td class="py-2 text-center">
            <span class="coin-standard">10</span>원
          </td>
          <td class="border-l py-1 text-center">
            <span class="coin-amount">0</span>
          </td>
        </tr>
      </tbody>
    </table>
  </section>
</div>`;

export const PRODUCT_PURCHASE_TEMPLATE = `<div id="product-purchase-container">
  <section>
    <h2 class="text-center text-2xl font-bold">
      상품 준비중입니다...
    </h2>
  </section>
</div>`;

export const CONTAINER_TEMPLATES = {
  manager: PRODUCT_MANAGER_TEMPLATE,
  charger: COIN_CHARGING_TEMPLATE,
  purchase: PRODUCT_PURCHASE_TEMPLATE,
};

export const createTemplateElement = (template) => {
  const $template = document.createElement("template");
  $template.innerHTML = template;
  return $template;
};
