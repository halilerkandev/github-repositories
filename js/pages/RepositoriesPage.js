import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #repositories-page {
      min-height: 100%;
    }
    .wrapper {
      grid-template-columns: 1fr 3fr;
      grid-template-rows: auto;
      grid-template-areas: 
        "login-area tabs-area"
        "user-area content-area";
      padding: 24px 24px 0;
      width: 100%;
      max-width: 1248px;
    }
    #login-area {
      grid-area: login-area;
      border-bottom: 1px solid #e1e4e8;
      top: 0;
      z-index: 0;
      background-color: white;
    }
    #tabs-area {
      grid-area: tabs-area;
      background-color: white;
      border-bottom: 1px solid #e1e4e8;
      top: 0;
    }
    #user-area {
      grid-area: user-area;
    }
    #content-area {
      grid-area: content-area;
    }
    #login {
      z-index: 20;
      visibility: hidden;
      background-color: white;
      transition-property: visibility;
      transition: visibility .12s ease-out;
      padding: 0 16px;
    }
    #content {
      padding: 0 8px;
    }
    #searchInput {
      width: 100%;
      padding: 5px 12px;
      font-size: 14px;
      line-height: 20px;
      color: var(--color-text-primary);
      vertical-align: middle;
      background-color: var(--color-input-bg);
      background-repeat: no-repeat;
      background-position: right 8px center;
      border: 1px solid var(--color-input-border);
      border-radius: 6px;
      outline: none;
      box-shadow: var(--color-shadow-inset);
    }
    #searchInput:focus {
      border-color: var(--color-state-focus-border);
      outline: none;
      box-shadow: var(--color-state-focus-shadow);
    }
    @media (max-width: 768px) {
      .wrapper {
        grid-template-columns: 1fr;
        grid-template-rows: auto;
        grid-template-areas: 
          "user-area"
          "tabs-area"
          "content-area";
        padding: 0 24px;
      }
      #login-area {
        display: none;
      }
    }
    a:hover {
      text-decoration: underline;
    }
    button {
      -webkit-appearance: button;
      display: block;
      text-align: center;
      padding: 3px 12px;
      color: var(--color-btn-text);
      background-color: var(--color-btn-bg);
      border: 1px solid var(--color-btn-border);
      box-shadow: var(--color-btn-shadow),var(--color-btn-inset-shadow);
      transition: .2s cubic-bezier(.3,0,.5,1);
      transition-property: color,background-color,border-color;
      font-weight: 500;
      line-height: 20px;
      white-space: nowrap;
      vertical-align: middle;
      cursor: pointer;
      user-select: none;
      border-radius: 6px;
    }
    button:hover {
      background-color: var(--color-btn-hover-bg);
      border-color: var(--color-btn-hover-border);
      transition-duration: .1s;
    }
  </style>
  <div id="repositories-page" class="flex justify-center">
    <div class="wrapper grid height-full width-full">
      <div id="login-area" class="sticky">
        <div id="login" class="height-full flex align-center">
          Login
        </div>
      </div>
      <div id="tabs-area" class="sticky">
        <tabs-container></tabs-container>
      </div>
      <div id="user-area">
        <user-card></user-card>
      </div>
      <div id="content-area">
        <div id="content">
          <div style="padding: 16px 0;width:100%;border-bottom: 1px solid var(--color-border-primary);">
            <input id="searchInput" title="Find a repository.." type="text" autofocus autocomplete="off" placeholder="Find a repository.." />
          </div>
          <div style="display:inline-block;padding: 16px 0;font-size: 14px;border-bottom: 1px solid var(--color-border-primary);">
            <strong id="repo-count"></strong> results for <strong>public</strong> repositories
          </div>
          <div id="repo-container" class="flex flex-column width-full"></div>
        </div>
      </div>
    </div>
  </div>
`;

export class RepositoriesPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    document.title = 'Repositories Page';

    const params = JSON.parse(this.getAttribute('params'));
    const userCard = this.shadowRoot.querySelector('user-card');
    userCard.dispatchEvent(
      new CustomEvent('loginFired', { detail: params.login })
    );
  }

  async connectedCallback() {
    const login = this.shadowRoot.querySelector('#login');
    login.addEventListener('show', () => {
      login.style.visibility = 'visible';
    });
    login.addEventListener('hide', () => {
      login.style.visibility = 'hidden';
    });

    const params = JSON.parse(this.getAttribute('params'));
    const user = await this.handleUserFetch(params.login);

    if (user?.avatarUrl) {
      login.innerHTML = `
        <user-avatar src="${user.avatarUrl}" alt="${params.login}" size="32px"></user-avatar>
        <span style="margin: 0 0 0 10px">${params.login}</span>
      `;
    }

    if (user?.repositories) {
      const repoCount = this.shadowRoot.querySelector('#repo-count');
      repoCount.innerHTML = user.repositories.totalCount;

      const repoContainer = this.shadowRoot.querySelector('#repo-container');
      repoContainer.innerHTML = user.repositories.nodes
        .map(
          (repo) =>
            `
              <div class="flex flex-column width-full" style="padding:24px 0;border-bottom: 1px solid var(--color-border-primary);">
                <div class="flex width-full">
                  <div class="flex flex-column flex-1">
                    <h3 style="font-size:20px;margin-bottom:4px;">
                      <a href="${repo.url}" title="${
              repo.name
            }" style="color: #0366d6;line-height: 1.5;">${repo.name}</a>
                    </h3>
                    ${
                      repo.description
                        ? `<p style="max-width: 400px;padding:0 24px 0 0;margin:0 0 8px;color: #586069;font-size:14px;">${repo.description}</p>`
                        : ''
                    }
                  </div>
                  <div>
                    <button class="flex align-center"><star-icon margin-right="3px"></star-icon>Star</button>
                  </div>
                </div>
                <div class="flex width-full align-center" style="margin-top:8px;">
                    ${
                      repo?.languages?.nodes[0]
                        ? `
                        <div class="flex align-center" style="font-size:12px;color:#586069;">
                          <div style="margin-right:4px;width:12px;height:12px;border-radius:12px;background-color:${repo.languages.nodes[0].color}"></div>${repo.languages.nodes[0].name}
                        </div>
                      `
                        : ''
                    }
                    ${
                      repo?.stargazerCount > 0
                        ? `
                      <div class="flex align-center" style="margin-left:16px;font-size:12px;">
                        <star-icon size="16px" margin-right="3px"></star-icon>${repo.stargazerCount}
                      </div>
                    `
                        : ''
                    }
                </div>
              </div>
            `
        )
        .join()
        .replace(/\,/g, '');
    }
  }

  disconnectedCallback() {}

  async handleUserFetch(login) {
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'bearer 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',
      },
      body: JSON.stringify({
        query: `
          {
            user(login: "${login}") {
              avatarUrl(size: 50)
              repositories(privacy: PUBLIC, first: 20) {
                totalCount
                nodes {
                  createdAt
                  updatedAt
                  description
                  forkCount
                  stargazerCount
                  name
                  languages(first: 1) {
                    nodes {
                      color
                      id
                      name
                    }
                  }
                  url
                }
              }
            }
          }
        `,
      }),
    });
    const { data } = await response.json();
    return data.user || {};
  }
}
