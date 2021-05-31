import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    .tab {
      display: inline-block;
      padding: 8px 16px;
      line-height: 30px;
      text-align: center;
      font-size: 14px;
      border-bottom: 2px solid transparent;
      margin-bottom: -1px;
      cursor: pointer;
      transition-property: border-color;
      transition: border-color .12s ease-out;
      font-weight: 300;
    }
    .tab:hover {
      border-color: #d1d5da;
    }
    .tab:hover.active, .active {
      border-color: #f9826c;
      font-weight: 500;
    }
  </style>
  <a class="tab">
    <slot name="icon"></slot>
    <slot name="title"></slot>
    <slot name="repo-nmb"></slot>
  </a>
`;

export class TabLink extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const active = this.getAttribute('active');
    if (active) {
      const tab = this.shadowRoot.querySelector('.tab');
      tab.setAttribute('class', 'tab active');

      // const tab = this.shadowRoot.querySelector('.tab');
    }
  }
}
