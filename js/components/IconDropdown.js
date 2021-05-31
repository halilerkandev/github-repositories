import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #icon-dropdown {
      cursor: pointer;
    }
  </style>
  <div id="icon-dropdown" class="flex align-center ml-3">
    <slot></slot>
    <dropdown-caret margin-left="4px" margin-top="-1px"></dropdown-caret>
  </div>
`;

export class IconDropdown extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
