import { BASE_STYLE } from './theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #app-root {
      width: 100%;
      height: 100%;
    }
  </style>
  <div id="app-root">
    <app-layout></app-layout>
  </div>
`;

export class AppRoot extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListener('historyChanged', this.handleHistoryChanged);
  }

  disconnectedCallback() {
    this.removeEventListener('historyChanged', this.handleHistoryChanged);
  }

  handleHistoryChanged(e) {
    e.preventDefault();
    this.shadowRoot
      .querySelector('app-layout')
      .setAttribute('route', location.pathname);
  }
}
