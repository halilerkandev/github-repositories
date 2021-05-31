import { BASE_STYLE } from '../theme.js';

const template = document.createElement('template');

template.innerHTML = `
  <style>
    ${BASE_STYLE}
    .repo-nmb {
      display: inline;
      padding: 2px 5px;
      border-radius: 20px;
      font-weight: 500;
      background-color: #d1d5da80;
      font-size: 12px;
    }
  </style>
  <nav id="tabs" class="flex">
    <tab-link>
      <book-icon slot="icon" margin-right="4px"></book-icon>
      <span slot="title" class="title">
        Overview
      </span>
    </tab-link>
    <tab-link active="true">
      <repo-icon slot="icon" margin-right="4px"></repo-icon>
      <span slot="title" class="title">
        Repositories
      </span>
      <span slot="repo-nmb" class="repo-nmb">20</span>
    </tab-link>
    <tab-link>
      <project-icon slot="icon" margin-right="4px"></project-icon>
      <span slot="title" class="title">
        Projects
      </span>
    </tab-link>
    <tab-link>
      <package-icon slot="icon" margin-right="4px"></package-icon>
      <span slot="title" class="title">
        Packages
      </span>
    </tab-link>
  </nav>
`;

export class TabsContainer extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
  }
}
