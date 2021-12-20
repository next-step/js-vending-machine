import { $ } from '../../src/util/index.js';
import { ERROR_MESSAGES, PRODUCT_PRICE, PRODUCT_QUANTITY } from '../../src/constants/index.js';

describe("자판기 상품관리 Tab 테스트", () => {
  const mockProducts = [
    {
      name: "사이다",
      price: 900,
      quantity: 10
    },
    {
      name: "스프라이트",
      price: 950,
      quantity: 22
    }
  ];
  
  before(() => {
    cy.visit("/");
  });

  beforeEach(() => {
    cy.restoreLocalStorage()

    cy.get("#product-name-input").as("ip-name");
    cy.get("#product-price-input").as("ip-price");
    cy.get("#product-quantity-input").as("ip-quantity");
    cy.get("#product-add-button").as("btn-add");
    cy.get("#product-add-form").as("form-add");
    cy.get("table.product-inventory").as("table-product");
  });

  afterEach(() => {
    cy.saveLocalStorage()
  })

  context("1. 상품관리 Tab에서 화면 확인.", () => {
    it("상품 관리 button이 active되어 있어야 한다.", () => {
      cy.get("#product-manage-menu").should('have.class', 'on');
    });

    it("상품명, 가격, 수량을 입력하는 input과 추가하기 버튼, 상품현황 표가 보여야 한다. ", () => {
      const visibleElements = ["@ip-name", "@ip-price", "@ip-quantity", "@btn-add", "@table-product"];

      visibleElements.forEach(elem => {
        cy.get(elem).should('be.visible');
      })
    });
  })

  context("2. 상품 추가하기 입력 Form에서 유효성 검사.", () => {
    context("2-1. 상품명, 가격, 수량을 모두 입력하지 않고 추가하기 버튼을 클릭했을 때,", () => {
      const inputs = ["@ip-name", "@ip-price", "@ip-quantity"];

      it(`상품명, 가격, 수량 input하단에 "${ERROR_MESSAGES.NO_VALUE}" 에러메세지가 보여야 한다.`, () => {
        cy.get("@form-add").submit();

        inputs.forEach(input => {
          cy.get(input).next(".error-message").should('have.text', ERROR_MESSAGES.NO_VALUE);
        })
      });

      it(`상품명, 가격, 수량 input이 error style로 보여야 한다.`, () => {
        inputs.forEach(input => {
          cy.get(input).parent("label").should('have.class', 'is-error');
        })
      });
    });

    context("2-2. 상품명에 공백이 포함된 값을 입력 후 추가하기 버튼을 클릭했을 때,", () => {
      it(`상품명 input하단에 "${ERROR_MESSAGES.NO_VALUE}" 에러메세지가 보여야 한다.`, () => {
        const invalidValues = ["  ", " 사이 다"];

        invalidValues.forEach(value => {
          cy.submitAfterInputType("@ip-name", value);
          cy.get("@ip-name").next(".error-message").should('have.text', ERROR_MESSAGES.INVALID_PRODUCT_NAME);
        })
        cy.get("@ip-name").clear();
      });
    });

    context(`2-3. 가격에 최솟값 ${PRODUCT_PRICE.MIN}보다 더 작은 값 또는 최소 단위 ${PRODUCT_PRICE.MIN_UNIT}보다 더 작은 단위가 포함된 값을 입력 후 추가하기 버튼을 클릭했을 때,`, () => {
      it(`가격 input하단에 "${ERROR_MESSAGES.INVALID_PRICE}" 에러메세지가 보여야 한다.`, () => {
        const invalidValues = ["90", "101"];

        invalidValues.forEach(value => {
          cy.submitAfterInputType("@ip-price", value);
          cy.get("@ip-price").next(".error-message").should('have.text', ERROR_MESSAGES.INVALID_PRICE);
        })
        cy.get("@ip-price").clear();
      });
    });

    context(`2-4. 수량에 최솟값 ${PRODUCT_QUANTITY.MIN}보다 더 작은 값을 입력 후 추가하기 버튼을 클릭했을 때,`, () => {
      it(`수량 input하단에 "${ERROR_MESSAGES.INVALID_PRICE}" 에러메세지가 보여야 한다.`, () => {
        const invalidValues = ["0", "-10"];
        
        invalidValues.forEach(value => {
          cy.submitAfterInputType("@ip-quantity", value);
          cy.get("@ip-quantity").next(".error-message").should('have.text', ERROR_MESSAGES.INVALID_QUANTITY);
        })
        cy.get("@ip-quantity").clear();
      });
    });
  });

  context("3. 상품을 추가했을 때", () => {
    it("상품 현황 테이블에 상품이 보여야 하고 입력 폼에 입력한 값과 동일해야 한다.", () => {
      mockProducts.forEach(product => {
        cy.submitAfterInputTypeAll(product);
  
        const values = Object.values(product);
  
        cy.get("#product-inventory-container tr").last().find("td").each(($td, index) => {
          cy.wrap($td).should('have.text', values[index]);
        })
      })
    });

    it("이미 있는 상품과 이름이 같은 경우 기존 상품의 가격 또는 수량 정보를 업데이트해야 한다.", () => {
      const willUpdateProduct = {
        name: "사이다",
        price: 1100,
        quantity: 15
      };

      const foundIndex = mockProducts.findIndex(v => v.name === willUpdateProduct.name);
      mockProducts.splice(foundIndex, 1, willUpdateProduct);

      cy.submitAfterInputTypeAll(willUpdateProduct);
  
      const values = Object.values(willUpdateProduct);
  
      cy.get("#product-inventory-container tr").eq(foundIndex).find("td").each(($td, index) => {
        cy.wrap($td).should('have.text', values[index]);
      })
    });
  });

  context("4. 페이지를 새로고침 했을 때, 다른 탭에 진입하고 다시 상품 관리 탭에 왔을 때,", () => {
    it("상품 목록이 그대로 유지되어야 한다.", () => {
      cy.reload();

      cy.get("#vending-machine-manage-menu").click();
      cy.get("#product-manage-menu").click();
      
      cy.get("#product-inventory-container tr").each(($tr, i) => {
        const mockItem = Object.values(mockProducts[i]);
        cy.wrap($tr).find("td").each(($td, j) => {
          cy.wrap($td).should('have.text', mockItem[j]);
        })
      })
    });
  });
})
