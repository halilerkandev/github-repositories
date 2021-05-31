import { StarIcon } from './components/StarIcon.js';
import { SmileyIcon } from './components/SmileyIcon.js';
import { BookIcon } from './components/BookIcon.js';
import { RepoIcon } from './components/RepoIcon.js';
import { ProjectIcon } from './components/ProjectIcon.js';
import { PackageIcon } from './components/PackageIcon.js';
import { UserAvatar } from './components/UserAvatar.js';
import { GithubIcon } from './components/GithubIcon.js';
import { BellIcon } from './components/BellIcon.js';
import { DropdownCaret } from './components/DropdownCaret.js';
import { PlusIcon } from './components/PlusIcon.js';
import { UserCard } from './components/UserCard.js';
import { IconDropdown } from './components/IconDropdown.js';
import { TabLink } from './components/TabLink.js';
import { TabsContainer } from './components/TabsContainer.js';
import { AppHeader } from './components/AppHeader.js';
import { AppFooter } from './components/AppFooter.js';
import { AppLayout } from './components/AppLayout.js';

import { FormPage } from './pages/FormPage.js';
import { RepositoriesPage } from './pages/RepositoriesPage.js';

import { AppRoot } from './AppRoot.js';

window.customElements.define('star-icon', StarIcon);
window.customElements.define('smiley-icon', SmileyIcon);
window.customElements.define('book-icon', BookIcon);
window.customElements.define('repo-icon', RepoIcon);
window.customElements.define('project-icon', ProjectIcon);
window.customElements.define('package-icon', PackageIcon);
window.customElements.define('user-avatar', UserAvatar);
window.customElements.define('github-icon', GithubIcon);
window.customElements.define('bell-icon', BellIcon);
window.customElements.define('dropdown-caret', DropdownCaret);
window.customElements.define('plus-icon', PlusIcon);
window.customElements.define('user-card', UserCard);
window.customElements.define('icon-dropdown', IconDropdown);
window.customElements.define('tab-link', TabLink);
window.customElements.define('tabs-container', TabsContainer);
window.customElements.define('app-header', AppHeader);
window.customElements.define('app-footer', AppFooter);
window.customElements.define('app-layout', AppLayout);

window.customElements.define('form-page', FormPage);
window.customElements.define('repositories-page', RepositoriesPage);

window.customElements.define('app-root', AppRoot);

window.addEventListener('popstate', () => {
  document
    .querySelector('app-root')
    .dispatchEvent(new CustomEvent('historyChanged'));
});
