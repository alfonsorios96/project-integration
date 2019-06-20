import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

class LoginPage extends PageDM {
  static get styles() {
      return css`
        .container {
          margin-left: 30%;
          width: 600px;
          display: flex;
          flex-direction: column;
        }

        .row {
          display: flex;
          justify-content: space-between;
          border: 1px solid black;
          padding-left: 15px;
          padding-right: 15px;
        }

        span {
          margin-top: 30px;
        }

        paper-button.primary {
          background-color: green;
          color: white;
          width: 100%;
          margin: 10px;
        }
        paper-button.secondary {
          background-color: blue;
          color: white;
          width: 100%;
          margin: 10px;
        }
      `;
    }

    render() {
      return html`
        <section class="container">
            <div class="row">
                <span>Email Interestelar</span>
                <paper-input label="Email Interestelar">
                <iron-icon icon="mail" slot="prefix"></iron-icon>
                </paper-input>
          </div>
          <div class="row">
            <span>Contraseña</span>
            <paper-input label="Contraseña" type="password">
              <iron-icon icon="verified-user" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
          <paper-button class="secondary" @click="${this._backPage}">Página atrás</paper-button>
            <paper-button class="primary">Iniciar sesión</paper-button>
          </div>
        </section>
      `;
    }
}

window.customElements.define('login-page', LoginPage);
