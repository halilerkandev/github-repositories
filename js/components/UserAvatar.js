import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    .user-avatar {
      border-radius: 100px;
    }
  </style>
  <img class="user-avatar" />
`;

export class UserAvatar extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));

    const userAvatar = this.shadowRoot.querySelector('.user-avatar');

    const src = this.getAttribute('src');
    const alt = this.getAttribute('alt');
    userAvatar.setAttribute('src', src);
    userAvatar.setAttribute('alt', alt);

    const size = this.getAttribute('size') || '20px';
    userAvatar.setAttribute('width', size);
    userAvatar.setAttribute('height', size);

    this.style.height = size;
  }
}
