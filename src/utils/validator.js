export const isNameAvailable = (name) => {
  if (name === "") {
    alert("이름을 입력해주세요");
    return false;
  }

  return true;
};

export const isPriceAvailable = (price) => {
  if (price === "") {
    alert("가격을 입력해주세요");
    return false;
  }

  if (Number(price) < 100) {
    alert("가격은 100원 이상이어야 합니다");
    return false;
  }

  if (Number(price) % 10 !== 0) {
    alert("가격은 10원으로 나누어 떨어져야 합니다");
    return false;
  }

  return true;
};

export const isQuantityAvailable = (quantity) => {
  if (quantity === "") {
    alert("수량을 입력해주세요");
    return false;
  }

  if (Number(quantity) < 1) {
    alert("수량은 1개 이상이어야 합니다");
    return false;
  }

  return true;
};

export const findDuplicatedIdx = (products, name) => {
  return products.findIndex((i) => i.name === name);
};
