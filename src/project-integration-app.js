import {LitElement, html} from 'lit-element';

// These are the elements needed by this element.
import {styles} from './project-integration-styles.js';
import { fadeInTransitionPage } from './utils/project-integration-transitions.js';

import './pages/default-page.js';
import './pages/home-page.js';
import './pages/register-page.js';
import './pages/info-page.js';
import './pages/login-page.js';
// import {menuIcon} from './utils/project-integration-icons.js';

class ProjectIntegration extends LitElement {
  static get properties() {
    return {
      appTitle: {type: String},
      _page: {type: String}
    };
  }

  static get styles() {
      return [
          styles,
          fadeInTransitionPage
        ];
    }

  render() {
    return html`
      <style>
        .main-app.out {
              animation: ${this._config.transition.type}TransitionPage ${this._config.transition.delay / 1000}s;
          }
      </style>
      <!-- Header -->
      <header class="header-app">
        <div class="title container-app">
          Rick And Morty
        </div>
      </header>
      <!-- Main content -->
      <main role="main" class="container-app main-app">
        ${
            this._page === 'home' ?
              html`<home-page class="page" active @page-changed="${this.changePage}"></home-page>` :
              ''
        }
        ${
            this._page === 'register' ?
              html`<register-page class="page" active @page-changed="${this.changePage}"></register-page>` :
              ''
        }
        ${
            this._page === 'modify' ?
              html`<modify-page class="page" active @page-changed="${this.changePage}"></modify-page>` :
              ''
        }
        ${
            this._page === 'login' ?
              html`<login-page class="page" active @page-changed="${this.changePage}"></login-page>` :
              ''
        }
        ${
            this._page === 'info' ?
              html`<info-page class="page" active @page-changed="${this.changePage}"></info-page>` :
              ''
        }
        ${
          this._page === 'default' ?
            html`<default-page class="page" active></default-page>` :
            ''
        }
      </main>
      <footer class="footer-app">
        <div class="container-footer">
          <p>Made with &#9829; by Karla Cabañas</p>
        </div>
        <a class="social-github" href="https://github.com/karla_cabanas">
          <img src="https://upload.wikimedia.org/wikipedia/commons/9/91/Octicons-mark-github.svg" alt="github-logo">
          <b>View on github</b>
        </a>
      </footer>
    `;
  }

  constructor() {
    super();
    this._page = 'home';
    this._config = {
      type: 'app',
      transition: {
        type: 'fadeIn',
        delay: 300
      }
    }
  }

  changePage(event) {
      const page = event.detail;
      this._page = page;
    }

  updated(changedProps) {
    if (changedProps.has('_page')) {
      const pageOut = this.shadowRoot.querySelector('.main-app');
      pageOut.classList.add('out');
      setTimeout(() => {
        pageOut.classList.remove('out');
      }, this._config.transition.delay);
    }
  }
}

window.customElements.define('project-integration-app', ProjectIntegration);
