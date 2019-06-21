import {html, css} from 'lit-element';
import '@polymer/paper-button/paper-button.js'
import {PageDM} from '../utils/page-dm.js';

class HomePage extends PageDM {
  static get styles() {
      return css`
        h2 {
          font-size: 32px;
          color: white;
          position: absolute;
          left: 40%;
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
        
        img {
          margin-left: -15px;
          margin-right: -15px;
          margin-top: -15px;
        }
      `;
    }
    render() {
      return html`
      <section class="container">
        <img src="../../images/rickMorty.jpeg" alt="Rick and Morty">
        <h2>Rick And Morty</h2>
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
