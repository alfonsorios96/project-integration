import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

class ModifyPage extends PageDM {
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
        paper-button.ternary {
          background-color: red;
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
            <span>Nombre del personaje</span>
            <paper-input label="Nombre del personaje">
              <iron-icon icon="account-circle" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Contraseña</span>
            <paper-input label="Contraseña" type="password">
              <iron-icon icon="verified-user" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Galaxia</span>
            <paper-input label="Galaxia">
              <iron-icon icon="cloud" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Planeta</span>
            <paper-input label="Planeta">
              <iron-icon icon="language" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Email Interestelar</span>
            <paper-input label="Email Interestelar">
              <iron-icon icon="mail" slot="prefix"></iron-icon>
            </paper-input>
          </div>
          <div class="row">
            <paper-button class="secondary" @click="${this._backPage}">Página atrás</paper-button>
            <paper-button class="primary">Modificar</paper-button>
            <paper-button class="ternary">Eliminar</paper-button>
          </div>
        </section>
      `;
    }

    _backPage() {
      this.dispatchEvent(new CustomEvent('page-changed', {
        detail: 'home'
      }));
    }
}

window.customElements.define('modify-page', ModifyPage);
