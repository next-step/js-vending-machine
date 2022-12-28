export const PRODUCT_CONTAINER_TEMPLATE = `<div>
  <section class="mb-10">
    <h2 class="mb-5 text-2xl font-bold">상품 추가하기</h2>
    <form class="flex">
      <div class="flex shrink justify-between">
        <input
          type="text"
          class="product-input"
          name="product-name"
          placeholder="상품명"
        />
        <input
          type="number"
          name="product-price"
          class="product-input"
          placeholder="가격"
          min="0"
        />
        <input
          type="number"
          name="product-quantity"
          class="product-input"
          placeholder="수량"
          min="0"
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
      <tbody id="product-inventory-container">
        <tr class="border-t">
          <td class="py-2 text-center">1</td>
          <td class="py-2 border-l text-center">2</td>
          <td class="py-2 border-l text-center">3</td>
        </tr>
        <tr class="border-t">
          <td class="py-2 text-center">1</td>
          <td class="py-2 border-l text-center">2</td>
          <td class="py-2 border-l text-center">3</td>
        </tr>
      </tbody>
    </table>
  </section>
  </div>`;

export const COIN_CHARGING_TEMPLATE = `<div>
  <section className="mb-10">
    <h2 className="mb-5 text-center text-2xl font-bold">
      자판기 동전 충전하기
    </h2>
    <form className="flex justify-center">
      <div className="flex shrink">
        <input
          type="number"
          className="product-input w-full"
          name="product-quantity"
          placeholder="자판기가 보유할 금액"
          min="0"
        />
      </div>
      <button
        type="submit"
        id="product-add-button"
        className="ml-3 shrink-0 border px-3 py-1"
      >
        충전하기
      </button>
    </form>
    <p
      id="retention-amount"
      className="mx-auto mt-8 box-border w-8/12 rounded-xl border border-2 border-dashed p-3 text-center"
    >
      보유 금액: 0원
    </p>
  </section>
  <section>
    <h2 className="mb-5 text-2xl font-bold">자판기가 보유한 동전</h2>
    <table
      id="product-inventory"
      className="w-full overflow-hidden rounded-md border bg-slate-100"
    >
      <thead>
      <tr className="border-slate-100 bg-slate-600 text-white">
        <th className="w-1/2 py-2 font-normal">동전</th>
        <th className="w-1/2 border-l py-2 font-normal">개수</th>
      </tr>
      </thead>
      <tbody id="product-inventory-container">
      <tr className="border-t">
        <td className="py-1 text-center">500원</td>
        <td className="border-l py-2 text-center">2</td>
      </tr>
      <tr className="border-t">
        <td className="py-2 text-center">100원</td>
        <td className="border-l py-2 text-center">2</td>
      </tr>
      <tr className="border-t">
        <td className="py-2 text-center">50원</td>
        <td className="border-l py-2 text-center">2</td>
      </tr>
      <tr className="border-t">
        <td className="py-2 text-center">10원</td>
        <td className="border-l py-1 text-center">2</td>
      </tr>
      </tbody>
    </table>
  </section>
</div>`;

export const PRODUCT_PURCHASE_TEMPLATE = `<div>
  <section class="mb-10">
    <h2 class="mb-5 text-center text-2xl font-bold">
      상품 준비중입니다...
    </h2>
  </section>
</div>`;
