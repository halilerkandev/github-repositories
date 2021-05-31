import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #form-page {
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      min-height: 100%;
      padding: 0 32px;
    }
    #wrapper {
      position: relative;
      display: flex;
      flex-direction: column;
      width: 100%;
      max-width: 350px;
    }
    #loginInput {
      width: 100%;
      max-width: 350px;
      padding: 5px 12px;
      margin-bottom: 10px;
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
    #loginInput:focus {
      border-color: var(--color-state-focus-border);
      outline: none;
      box-shadow: var(--color-state-focus-shadow);
    }
    button {
      -webkit-appearance: button;
      display: block;
      text-align: center;
      width: 100%;
      max-width: 350px;
      padding: 5px 16px;
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
    #error {
      position: absolute;
      bottom: -25px;
      width: 100%;
      max-width: 350px;
      margin-top: 10px;
      font-size: 14px;
      display: none;
      color: var(--color-btn-danger-text);
    }
  </style>
  <div id="form-page">
    <div id="wrapper">
      <input id="loginInput" title="Type a user & press Enter or click the button" type="text" autofocus autocomplete="off" placeholder="Type a user & press Enter or click the button" />
      <button id="submitLogin" title="Go to user">Go to user</button>
      <span id="error"></span>
    </div>
  </div>
`;

export class FormPage extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    document.title = 'Form Page';
    console.log(JSON.parse(this.getAttribute('params')));
  }

  connectedCallback() {
    const loginInput = this.shadowRoot.querySelector('#loginInput');
    loginInput.addEventListener('input', this.clearError);
    loginInput.addEventListener('keyup', this.handleKeyup.bind(this));
    loginInput.addEventListener(
      'buttonClicked',
      this.handleButtonClicked.bind(this)
    );

    const submitLogin = this.shadowRoot.querySelector('#submitLogin');
    submitLogin.addEventListener('click', this.handleClick.bind(this));
  }

  disconnectedCallback() {
    const loginInput = this.shadowRoot.querySelector('#loginInput');
    loginInput.removeEventListener('input', this.clearError);
    loginInput.removeEventListener('keyup', this.handleKeyup.bind(this));
    loginInput.removeEventListener(
      'buttonClicked',
      this.handleButtonClicked.bind(this)
    );

    const submitLogin = this.shadowRoot.querySelector('#submitLogin');
    submitLogin.removeEventListener('click', this.handleClick.bind(this));
  }

  async handleKeyup(e) {
    if (e.key === 'Enter') {
      await this.handleButtonClicked(e);
    }
  }

  async handleButtonClicked(e) {
    e.preventDefault();
    if (e.target.value === '') {
      const error = this.shadowRoot.querySelector('#error');
      error.textContent = '*Please, type a user!';
      error.setAttribute('style', 'display: inline-block;');
      return;
    }
    const response = await fetch('https://api.github.com/graphql', {
      method: 'POST',
      headers: {
        Authorization: 'bearer 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',
      },
      body: JSON.stringify({
        query: `
          query {
            user(login: "${e.target.value}") {
              login
            }
          }
        `,
      }),
    });
    const { data } = await response.json();
    if (data.user) {
      const url = `/${data.user.login}/repositories`;
      history.pushState(null, null, url);
      this.getRootNode().dispatchEvent(new CustomEvent('routeChanged'));
    } else {
      const error = this.shadowRoot.querySelector('#error');
      error.textContent = '*User not found!';
      error.setAttribute('style', 'display: inline-block;');
    }
  }

  clearError(e) {
    e.preventDefault();
    const error = this.parentNode.querySelector('#error');
    error.textContent = '';
    error.setAttribute('style', 'display: none;');
  }

  handleClick(e) {
    e.preventDefault();
    loginInput.dispatchEvent(new CustomEvent('buttonClicked'));
  }
}
