import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-toast/paper-toast.js';
import 'js-sha256';

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
        
        paper-toast {
          --paper-toast-background-color: red;
          --paper-toast-color: white;
        }
      `;
  }

  render() {
    return html`
        <paper-toast id="toast"></paper-toast>
        <section class="container">
            <div class="row">
                <span>Email Interestelar</span>
                <paper-input label="Email Interestelar" id="mail">
                <iron-icon icon="mail" slot="prefix"></iron-icon>
                </paper-input>
          </div>
          <div class="row">
            <span>Contraseña</span>
            <paper-input label="Contraseña" type="password" id="pass">
              <iron-icon icon="verified-user" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
          <paper-button class="secondary" @click="${this._backPage}">Página atrás</paper-button>
            <paper-button class="primary" @click="${this.login}">Iniciar sesión</paper-button>
          </div>
        </section>
      `;
  }

  login() {
    const emailInput = this.shadowRoot.querySelector('#mail');
    const passInput = this.shadowRoot.querySelector('#pass');
    const promise = firebase.database().ref('users/').once('value');
    promise.then(snapshot => {
      const users = snapshot.val();
      for (const key in users) {
        const user = users[key];
        const formPass = sha256(passInput.value);
        if (user.email === emailInput.value && user.password === formPass) {
          window.sessionStorage.setItem('currentUser', user.uid);
          this.dispatchEvent(new CustomEvent('page-changed', {
            detail: 'modify'
          }));
          break;
        }
      }
      const toast = this.shadowRoot.querySelector('paper-toast');
      toast.text = 'Correo o contraseña incorrectos';
      toast.show();
    }).catch(() => {
      const toast = this.shadowRoot.querySelector('paper-toast');
      toast.text = 'Error en el sistema';
      toast.show();
    });
  }
}

window.customElements.define('login-page', LoginPage);
