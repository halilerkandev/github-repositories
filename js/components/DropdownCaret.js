import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #dropdown-caret {
      display: inline-block;
      width: 0;
      height: 0;
      vertical-align: middle;
      content: "";
      border-top-style: solid;
      border-top-width: 4px;
      border-right: 4px solid transparent;
      border-bottom: 0 solid transparent;
      border-left: 4px solid transparent;
      color: white;
    }
  </style>
  <span id="dropdown-caret"></span>
`;

export class DropdownCaret extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const marginLeft = this.getAttribute('margin-left') || '0';
    this.style.marginLeft = marginLeft;

    const marginTop = this.getAttribute('margin-top') || '0';
    this.style.marginTop = marginTop;
  }
}
