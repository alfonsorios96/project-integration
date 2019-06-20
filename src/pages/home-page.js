import {html, css} from 'lit-element';
import '@polymer/paper-button/paper-button.js'
import {PageDM} from '../utils/page-dm.js';

class HomePage extends PageDM {
  static get styles() {
      return css`
        h2 {
          font-size: 32px;
          text-align: center;
        }

        .container {
            display: flex;
            flex-direction: column;
        }

        .row {
          display: flex;
          justify-content: space-evenly;
          margin: 40px;
        }
        
        paper-button {
          background-color: rgb(121, 134, 203);
          color: white;
        }
      `;
    }
    render() {
      return html`
      <h2>Rick And Morty</h2>
      <section class="container">
        <div class="row">
          <paper-button @click="${this._changePage}" data-page="register">Registrar</paper-button>
          <paper-button @click="${this._changePage}" data-page="login">Modificar</paper-button>
        </div>
        <div class="row">
          <paper-button @click="${this._changePage}" data-page="info">Ver info</paper-button>
        </div>
      </section>
    `;
    }

    _changePage(event) {
        const page = event.currentTarget.dataset.page;
        this.dispatchEvent(new CustomEvent('page-changed', {detail: page}));
    }
}

window.customElements.define('home-page', HomePage);
