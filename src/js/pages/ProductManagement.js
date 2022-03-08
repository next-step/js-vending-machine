import Component from "../lib/Component.js";
import {$} from "../components/utils.js";
import {getProducts, setProducts} from "../components/storage.js";

export default class ProductManagement extends Component {
  setup() {
    this.state = {
      products: getProducts()
    }
    this.addProducts = this.addProducts.bind(this);
  }

  template() {
    const {products} = this.state;
    const {menu} = this.props;
    return `
      <article class="sub-menu" style="display: ${menu === 'ProductManagement' ? 'block' : 'none'}">
        <h3>상품 추가하기</h3>
        <div className="product-container">
          <input type="text" id="product-name-input" placeholder="상품명"/>
          <input type="number" id="product-price-input" placeholder="가격"/>
          <input type="number" id="product-quantity-input" placeholder="수량"/>
          <button id="product-add-button">추가하기</button>
        </div>
        <div class="margin"></div>
        <table className="product-inventory">
          <colgroup>
            <col style="width: 140px"/>
            <col style="width: 100px"/>
            <col style="width: 100px"/>
          </colgroup>
          <thead>
          <tr>
            <th>상품명</th>
            <th>가격</th>
            <th>수량</th>
          </tr>
          </thead>
          <tbody id="product-inventory-container">
            ${
              products.length > 0 ? products.map(product => (
                `
                  <tr>
                    <td>${product.name}</td>
                    <td>${product.price}</td>
                    <td>${product.qty}</td>
                  </tr>
                `
              )).join('') : ''
            }
          </tbody>
        </table>
      </article>
    `;
  }
  mounted() {
    $('#product-add-button').addEventListener('click', this.addProducts)
  }
  addProducts() {
    const name = $('#product-name-input').value;
    const price = $('#product-price-input').value;
    const qty = $('#product-quantity-input').value;

    if(name.match(/\s/)) {
      alert('상품명에는 공백이 포함될 수 없습니다.');
      return;
    }
    if(qty < 1) {
      alert('입력가능한 최소 수량은 1개 이상입니다.');
      return;
    }
    if(price < 100 || price % 10 !== 0) {
      alert('상품의 최소 가격은 100원이며, 10원으로 나누어 떨어져야 합니다.');
      return;
    }
    const {products} = this.state;

    if(products.find(product => product.name === name)) {
      products.map(product => {
        if(product.name === name) {
          product.price = price;
          product.qty = qty;
          return product;
        } else {
          return product;
        }
      })
    } else {
      products.push({name, price, qty});
    }
    setProducts(products);
    this.setState({products});
  }

}