import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #user-card {
      padding: 0 8px;
      margin-top: -32px;
      flex-direction: column;
    }
    #user-avatar-wrapper {
      position: relative;
    }
    #user-avatar {
      width: 100%;
      border-radius: 300px;
      z-index: 50;
    }
    #checkpoint {
      padding: 16px 0;
      z-index: -1000;
    }
    #user-name {
      color: #24292e;
      font-size: 26px;
    }
    #user-login {
      color: #586069;
      font-size: 20px;
    }
    #user-bio {
      color: #24292e;
      font-size: 16px;
      z-index: -1000;
    }
    #user-status-emoji {
      position: absolute;
      bottom: 15%;
      right: 5%;
      width: 40px;
      height: 40px;
      border-radius: 20px;
      background-color: white;
      border: 1px solid #e1e4e8;
    }
    @media (max-width: 768px) {
      #user-card {
        flex-direction: row;
        margin-top: 16px;
        align-items: center;
      }
      #user-bio {
        display: none;
      }
      #user-avatar {
        max-width: 120px;
        margin-right: 16px;
      }
    }
  </style>
  <div id="user-card" class="flex">
    <div id="user-avatar-wrapper">
      <img id="user-avatar" />
      <div id="user-status-emoji" class="flex align-center justify-center">
      </div>
    </div>
    <div id="checkpoint">
      <div id="user-name"></div>
      <div id="user-login"></div>
    </div>
    <div id="user-bio"></div>
  </div>
`;

export class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }

  connectedCallback() {
    this.addEventListener('loginFired', this.handleLoginFired);

    window.addEventListener('scroll', () => {
      const userAvatarWrapper = this.shadowRoot.querySelector(
        '#user-avatar-wrapper'
      );

      const elemTop = userAvatarWrapper.getBoundingClientRect().top;
      const elemHeight = userAvatarWrapper.getBoundingClientRect().height;

      const isVisible = elemTop + elemHeight >= 0;

      if (!isVisible) {
        const login = this.parentNode.parentNode.querySelector('#login');
        login.dispatchEvent(new CustomEvent('show'));
      } else {
        const login = this.parentNode.parentNode.querySelector('#login');
        login.dispatchEvent(new CustomEvent('hide'));
      }
    });
  }

  handleAttributeChanges() {
    this.removeEventListener('loginFired', this.handleLoginFired);
  }

  async handleLoginFired(e) {
    const user = await this.handleUserFetch(e.detail);

    const userAvatar = this.shadowRoot.querySelector('#user-avatar');
    userAvatar.setAttribute('src', user.avatarUrl);
    userAvatar.setAttribute('alt', e.detail);

    const userLogin = this.shadowRoot.querySelector('#user-login');
    userLogin.innerHTML = e.detail;

    const userName = this.shadowRoot.querySelector('#user-name');
    userName.innerHTML = user.name || '';

    const userBio = this.shadowRoot.querySelector('#user-bio');
    userBio.innerHTML = user.bio || '';

    const userStatusEmoji = this.shadowRoot.querySelector('#user-status-emoji');
    userStatusEmoji.innerHTML = user?.status?.emojiHTML
      ? user.status.emojiHTML
      : `<smiley-icon></smiley-icon>`;
  }

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
              avatarUrl(size: 500)
              bio
              name
              status {
                emojiHTML
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
