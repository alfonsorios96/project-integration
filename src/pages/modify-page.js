import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';
import '@polymer/paper-input/paper-input.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';
import '@polymer/paper-toast/paper-toast.js';

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
        
        paper-toast {
          --paper-toast-background-color: green;
          --paper-toast-color: white;
        }
      `;
  }

  static get properties() {
    return {
      user: Object
    };
  }

  constructor() {
    super();
    this.user = {};
  }

  render() {
    return html`
<paper-toast id="toast"></paper-toast>
        <section class="container">
          <div class="row">
            <span>Nombre del personaje</span>
            <paper-input label="Nombre del personaje" value="${this.user.name}" id="name">
              <iron-icon icon="account-circle" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Galaxia</span>
            <paper-input label="Galaxia" value="${this.user.galaxy}" id="galaxy">
              <iron-icon icon="cloud" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Planeta</span>
            <paper-input label="Planeta" value="${this.user.planet}" id="planet">
              <iron-icon icon="language" slot="prefix"></iron-icon>
            </paper-input> 
          </div>
          <div class="row">
            <span>Email Interestelar</span>
            <paper-input label="Email Interestelar" value="${this.user.email}" id="email">
              <iron-icon icon="mail" slot="prefix"></iron-icon>
            </paper-input>
          </div>
          <div class="row">
            <paper-button class="secondary" @click="${this._backPage}">Página atrás</paper-button>
            <paper-button class="primary" @click="${this._save}">Modificar</paper-button>
            <paper-button class="ternary" @click="${this.remove}">Eliminar</paper-button>
          </div>
        </section>
      `;
  }

  updated(changedProps) {
    if (changedProps.has('active')) {
      if (this.active) {
        const uid = window.sessionStorage.getItem('currentUser');
        firebase.database().ref(`users/${uid}`).on('value', snapshot => {
          const user = snapshot.val();
          this.user = user;
        });
      }
    }
  }

  remove() {
    const uid = window.sessionStorage.getItem('currentUser');
    firebase.database().ref(`users/${uid}`).remove();
    window.sessionStorage.removeItem('currentUser');
    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: 'home'
    }));
  }

  _backPage() {
    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: 'home'
    }));
  }

  _save() {
    const nameInput = this.shadowRoot.querySelector('#name');
    const galaxyInput = this.shadowRoot.querySelector('#galaxy');
    const planetInput = this.shadowRoot.querySelector('#planet');
    const emailInput = this.shadowRoot.querySelector('#email');

    firebase.database().ref(`users/${this.user.uid}`).set(Object.assign(this.user, {
      name: nameInput.value,
      galaxy: galaxyInput.value,
      planet: planetInput.value,
      email: emailInput.value
    }));

    const toast = this.shadowRoot.querySelector('paper-toast');
    toast.text = 'Se actualizó correctamente el usuario';
    toast.show();
  }
}

window.customElements.define('modify-page', ModifyPage);
