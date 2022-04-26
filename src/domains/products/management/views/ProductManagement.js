import Title from '../../../../components/Title';
import ProductAppender from '../components/ProductAppender';
import ProductInventory from '../components/ProductInventory';

const ProductManagement = () => {
  const template = document.createElement('template');
  const components = [];

  const container = document.createElement('div');
  container.id = 'product-management';

  components.push(
    Title('상품 추가하기'),
    ProductAppender(),
    Title('상품 현황'),
    ProductInventory(),
  );

  template.innerHTML = components.join('');
  container.append(template.content);

  return container;
};

export default ProductManagement;
