import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-toast/paper-toast.js';
import 'js-sha256';

class RegisterPage extends PageDM {
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
        
        paper-toast {
          --paper-toast-background-color: green;
          --paper-toast-color: white;
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
        <paper-toast id="toast"></paper-toast>
        <section class="container">
          <div class="row">
            <span>Nombre del personaje</span>
            <paper-input label="Nombre del personaje" id="name">
              <iron-icon icon="account-circle" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Contraseña</span>
            <paper-input label="Contraseña" type="password" id="pass">
              <iron-icon icon="verified-user" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Galaxia</span>
            <paper-input label="Galaxia" id="galaxy">
              <iron-icon icon="cloud" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Planeta</span>
            <paper-input label="Planeta" id="planet">
              <iron-icon icon="language" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Email Interestelar</span>
            <paper-input label="Email Interestelar" id="email">
              <iron-icon icon="mail" slot="prefix"></iron-icon>
            </paper-input>
          </div>
          <div class="row">
            <span>Imagen</span>
            <paper-input label="Imagen" id="image"></paper-input>
          </div>
          <div class="row">
            <paper-button class="secondary" @click="${this._backPage}">Página atrás</paper-button>
            <paper-button class="primary" @click="${this._save}">Guardar</paper-button>
          </div>
        </section>
      `;
  }

  _backPage() {
    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: 'home'
    }));
  }

  _save() {
    const nameInput = this.shadowRoot.querySelector('#name');
    const passwordInput = this.shadowRoot.querySelector('#pass');
    const galaxyInput = this.shadowRoot.querySelector('#galaxy');
    const planetInput = this.shadowRoot.querySelector('#planet');
    const emailInput = this.shadowRoot.querySelector('#email');
    const imageInput = this.shadowRoot.querySelector('#image');

    // Get a key for a new Post.
    const newUserKey = firebase.database().ref('users').push().key;

    firebase.database().ref(`users/${newUserKey}`).set({
      uid: newUserKey,
      name: nameInput.value,
      password: sha256(passwordInput.value),
      galaxy: galaxyInput.value,
      planet: planetInput.value,
      email: emailInput.value,
      image: imageInput.value
    });

    const toast = this.shadowRoot.querySelector('paper-toast');
    toast.text = 'Se registró correctamente el usuario';
    toast.show();

    nameInput.value = '';
    passwordInput.value = '';
    galaxyInput.value = '';
    planetInput.value = '';
    emailInput.value = '';
    imageInput.value = '';
  }
}

window.customElements.define('register-page', RegisterPage);
