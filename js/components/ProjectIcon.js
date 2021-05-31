import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #project-icon {
      color: #959da5;
      fill: currentColor;
      margin-bottom: -3px;
    }
  </style>
  <svg id="project-icon" aria-hidden="true" viewBox="0 0 16 16" version="1.1" data-view-component="true">
    <path fill-rule="evenodd" d="M1.75 0A1.75 1.75 0 000 1.75v12.5C0 15.216.784 16 1.75 16h12.5A1.75 1.75 0 0016 14.25V1.75A1.75 1.75 0 0014.25 0H1.75zM1.5 1.75a.25.25 0 01.25-.25h12.5a.25.25 0 01.25.25v12.5a.25.25 0 01-.25.25H1.75a.25.25 0 01-.25-.25V1.75zM11.75 3a.75.75 0 00-.75.75v7.5a.75.75 0 001.5 0v-7.5a.75.75 0 00-.75-.75zm-8.25.75a.75.75 0 011.5 0v5.5a.75.75 0 01-1.5 0v-5.5zM8 3a.75.75 0 00-.75.75v3.5a.75.75 0 001.5 0v-3.5A.75.75 0 008 3z"></path>
  </svg>
`;

export class ProjectIcon extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    const projectIcon = this.shadowRoot.querySelector('#project-icon');

    const size = this.getAttribute('size') || '16px';
    projectIcon.setAttribute('width', size);
    projectIcon.setAttribute('height', size);
    this.style.height = size;

    const marginRight = this.getAttribute('margin-right') || '0px';
    this.style.marginRight = marginRight;
  }
}
