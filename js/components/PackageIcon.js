import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #package-icon {
      color: #959da5;
      fill: currentColor;
      margin-bottom: -3px;
    }
  </style>
  <svg id="package-icon" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
    <path fill-rule="evenodd" d="M8.878.392a1.75 1.75 0 00-1.756 0l-5.25 3.045A1.75 1.75 0 001 4.951v6.098c0 .624.332 1.2.872 1.514l5.25 3.045a1.75 1.75 0 001.756 0l5.25-3.045c.54-.313.872-.89.872-1.514V4.951c0-.624-.332-1.2-.872-1.514L8.878.392zM7.875 1.69a.25.25 0 01.25 0l4.63 2.685L8 7.133 3.245 4.375l4.63-2.685zM2.5 5.677v5.372c0 .09.047.171.125.216l4.625 2.683V8.432L2.5 5.677zm6.25 8.271l4.625-2.683a.25.25 0 00.125-.216V5.677L8.75 8.432v5.516z"></path>
  </svg>
`;

export class PackageIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const packageIcon = this.shadowRoot.querySelector('#package-icon');

    const size = this.getAttribute('size') || '16px';
    packageIcon.setAttribute('width', size);
    packageIcon.setAttribute('height', size);
    this.style.height = size;

    const marginRight = this.getAttribute('margin-right') || '0px';
    this.style.marginRight = marginRight;
  }
}
