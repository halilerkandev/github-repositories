import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #app-header {
      padding: 0 32px;
      background-color: var(--color-header-bg);
    }
    .header-items-wrapper {
      height: 30px;
    }
  </style>
  <header id="app-header" class="flex align-center justify-center height-full"></header>
`;

export class AppHeader extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['isformpage'];
  }

  connectedCallback() {
    this.handleAttributeChanges();
  }

  attributeChangedCallback() {
    this.handleAttributeChanges();
  }

  handleAttributeChanges() {
    const appHeader = this.shadowRoot.querySelector('#app-header');
    const isFormPage = this.getAttribute('isformpage');
    if (isFormPage === 'false') {
      const avatarUrl = this.getAttribute('avatarUrl');
      const login = this.getAttribute('login');
      appHeader.innerHTML = `
        <div class="header-items-wrapper flex justify-between align-center width-full">
          <a style="width: 32px;height: 32px;" aria-label="Homepage" title="GitHub" href="https://github.com">
            <github-icon size="32px" hovercolor="#ffffffb3"></github-icon>
          </a>
          <div class="flex flex-1 height-full mr-3"></div>
          <div class="flex align-center">
            <div class="relative">
              <bell-icon></bell-icon>
              <span class="absolute" style="border:2px solid #24292e;background-image:linear-gradient(#54a3ff,#006eed);top:-6px;right:-4px;width:13px;height:13px;border-radius:11px;"></span>
            </div>
            <icon-dropdown>
              <plus-icon></plus-icon>
            </icon-dropdown>
            <icon-dropdown>
              <user-avatar src="${avatarUrl}" alt="${login}" size="20px"></user-avatar>
            </icon-dropdown>
          </div>
        </div>
       `;
    } else {
      appHeader.innerHTML = `
        <div class="header-items-wrapper flex justify-center align-center width-full">
          <a style="width: 32px;height: 32px;" aria-label="Homepage" title="GitHub" href="https://github.com">
            <github-icon size="32px" hovercolor="#ffffffb3"></github-icon>
          </a>
        </div>
      `;
    }
  }
}
