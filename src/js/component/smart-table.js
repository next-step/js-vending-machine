const template = document.createElement('template');
template.innerHTML = `
<style>
    table {
        border-collapse: collapse;
    }

    th,
    td {
        border: 1px solid #555;
        text-align: center;
        min-width: 80px;
        height: 40px;
    }
</style>

<h2></h2>
<slot></slot>
<table>
    <thead>
        <tr class="columns"></tr>
    </thead>
    <tbody></tbody>
</table>
`;

class SmartTable extends HTMLElement {
  constructor() {
    super();

    this._shadowRoot = this.attachShadow({ mode: 'open' });
    this._shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['title', 'id', 'columns'];
  }

  attributeChangedCallback(attrName, /* oldValue */ _, newValue) {
    const attributeProcess = {
      title: () => {
        this.shadowRoot.querySelector('h2').innerText = newValue;
      },
      columns: () => {
        const columnNames = (newValue || '').trim().split(',');
        this.shadowRoot.querySelector('tr.columns').innerHTML = columnNames.map((name) => `<th>${name}</th>`).join('');
      },
    };
    const func = attributeProcess[attrName];
    typeof func === 'function' && func();
  }

  get tableBodyElement() {
    return this.shadowRoot.querySelector('tbody');
  }
}

customElements.define('smart-table', SmartTable);
// https://coryrylan.com/blog/accessibility-with-id-referencing-and-shadow-dom
//https://stackoverflow.com/questions/55101967/getelementbyid-from-within-shadow-dom
