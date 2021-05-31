import { BASE_STYLE } from '../theme.js';
import { getMatchedRoute } from '../router.js';
import { getParams } from '../utils.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #app-layout {
      display: grid;
      grid-template-rows: [row1-start] 62px [row1-end] 1fr [third-line] 115px [last-line];
      width: 100%;
      min-height: 100%;
    }
  </style>
  <div id="app-layout">
    <app-header></app-header>
    <main id="page"></main>
    <app-footer></app-footer>
  </div>
`;

export class AppLayout extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  static get observedAttributes() {
    return ['route'];
  }

  async connectedCallback() {
    this.shadowRoot.addEventListener(
      'routeChanged',
      this.handleRouteChange.bind(this)
    );
    await this.handleRouteChange();
  }

  async attributeChangedCallback() {
    await this.handleRouteChange();
  }

  disconnectedCallback() {
    this.shadowRoot.removeEventListener(
      'routeChanged',
      this.handleRouteChange.bind(this)
    );
  }

  async handleRouteChange(e) {
    if (e) {
      e.preventDefault();
    }
    const matchedRoute = await getMatchedRoute();
    const params = getParams(matchedRoute);
    const appHeader = this.shadowRoot.querySelector('app-header');
    const val = matchedRoute.route.page === 'form-page' ? 'true' : 'false';
    if (val === 'false') {
      const { avatarUrl, login } = await this.handleFetchAvatar(params.login);
      appHeader.setAttribute('avatarUrl', avatarUrl);
      appHeader.setAttribute('login', login);
    }
    appHeader.setAttribute('isformpage', val);
    const page = this.shadowRoot.querySelector('#page');
    page.innerHTML = `
      <${matchedRoute.route.page} params=${JSON.stringify(params)}></${
      matchedRoute.route.page
    }>
    `;
  }

  async handleFetchAvatar(login) {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'bearer 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',
      },
      body: JSON.stringify({
        query: `
            {
              user(login: "${login}") {
                avatarUrl(size: 30)
              }
            }
          `,
      }),
    });
    const { data } = await response.json();
    return data.user || {};
  }
}
