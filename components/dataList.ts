class DataList extends HTMLTableSectionElement {
  private data: Map<string, any>;

  constructor() {
    super();

    this.data = new Map();
  }

  setData(key, data) {
    this.data.set(key, data);

    this.render();
  }

  private makeCell = (value, attr) => {
    const cell = document.createElement('td');
    for (const key in attr) {
      cell.setAttribute(key, attr[key]);
    }

    cell.innerText = value;
    return cell;
  }

  render() {
    const bodyFragment = document.createDocumentFragment();

    this.data.forEach((value, key) => {
      const $row = document.createElement('tr');

      $row.appendChild(this.makeCell(value.name, { id: 'product-manage-name' }));
      $row.appendChild(this.makeCell(value.price, { id: 'product-manage-price' }));
      $row.appendChild(this.makeCell(value.quantity, { id: 'product-manage-quantity' }));

      bodyFragment.appendChild($row);
    });

    this.innerHTML = '';
    this.appendChild(bodyFragment);
  }
}

export default DataList
