import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    #app-footer {
      padding: 0 16px 48px;
      font-size: 12px;
      color: var(--color-footer-text);
    }
    .footer-items-wrapper {
      max-width: 1248px;
      height: 26px;
      border-top: 1px solid var(--color-border-primary);
      padding-top: 40px;
    }
    .icon-wrapper {
      margin: 0 24px;
    }
    a {
      color: var(--color-footer-link);
    }
    a:hover {
      text-decoration: underline;
    }
    .size {
      height: 24px;
      width: 24px;
    }
    @media (max-width: 1010px) {
      #app-footer {
        padding-bottom: 68px;
      }
      .footer-items-wrapper {
        flex-direction: column;
        padding-top: 20px;
      }
      .list {
        justify-content: center;
        margin-bottom: 8px;
        flex-wrap: wrap;
        line-height: 1.4em;
      }
      .logo {
        display: none;
      }
    }
  </style>
  <footer id="app-footer" class="flex flex-column align-center height-full">
    <div class="footer-items-wrapper flex width-full">
      <ul class="flex flex-1 align-center list">
        <li class="mr-3">© 2021 GitHub, Inc.</li>
        <li class="mr-3"><a href="https://docs.github.com/en/github/site-policy/github-terms-of-service" data-ga-click="Footer, go to terms, text:terms">Terms</a></li>
        <li class="mr-3"><a href="https://docs.github.com/en/github/site-policy/github-privacy-statement" data-ga-click="Footer, go to privacy, text:privacy">Privacy</a></li>
        <li class="mr-3"><a href="https://github.com/security" data-ga-click="Footer, go to security, text:security">Security</a></li>
        <li class="mr-3"><a href="https://www.githubstatus.com/" data-ga-click="Footer, go to status, text:status">Status</a></li>
        <li><a data-ga-click="Footer, go to help, text:Docs" href="https://docs.github.com">Docs</a></li>
      </ul>
      <div class="flex icon-wrapper align-center logo">
        <a class="size" aria-label="Homepage" title="GitHub" href="https://github.com">
          <github-icon size="24px" color="#d1d5da" hovercolor="#6a737d"></github-icon>
        </a>
      </div>
      <ul class="flex justify-end flex-1 align-center list">
        <li><a href="https://support.github.com" data-ga-click="Footer, go to contact, text:contact">Contact GitHub</a></li>
        <li class="ml-3"><a href="https://github.com/pricing" data-ga-click="Footer, go to Pricing, text:Pricing">Pricing</a></li>
        <li class="ml-3"><a href="https://docs.github.com" data-ga-click="Footer, go to api, text:api">API</a></li>
        <li class="ml-3"><a href="https://services.github.com" data-ga-click="Footer, go to training, text:training">Training</a></li>
        <li class="ml-3"><a href="https://github.blog" data-ga-click="Footer, go to blog, text:blog">Blog</a></li>
        <li class="ml-3"><a data-ga-click="Footer, go to about, text:about" href="https://github.com/about">About</a></li>
      </ul>
    </div>
  </footer>
`;

export class AppFooter extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
