import {html, css} from 'lit-element';

import {PageDM} from '../utils/page-dm.js';
import '@polymer/paper-card/paper-card.js';
import '@polymer/paper-item/paper-item.js';
import '@polymer/paper-button/paper-button.js';
import '@polymer/iron-icons/iron-icons.js';
import '@polymer/iron-icon/iron-icon.js';

class InfoPage extends PageDM {
  static get styles() {
    return css`
        h2 {
          font-size: 36px;
          text-align: center;
        }
        .info {
          background-color: blue;
          color: white;
          width: 400px;
          margin-left: 36%;
          margin-bottom: 20px;
        }
      `;
  }


  render() {
    return html`
       <custom-style>
       <style is="custom-style">
       paper-card {
            width: 300px;
            margin-left: 10px;
            margin-bottom: 5px;
            
            --paper-card-header: {
              width: 100%;
              padding-top: 120%;
              position: relative;
            }
            
            --paper-card-header-image: {
              position: absolute;
              top: 0;
              left: 0;
              bottom: 0;
              right: 0;
              object-fit: cover;
            }
        }
</style>
</custom-style>
      <h2>Galactin Information</h2>
      <paper-button class="info" @click="${this._backPage}">Regresar</paper-button>
        <section class="container">
          ${this.users.map(user => html`
            <paper-card .image="${user.image}">
              <paper-item><iron-icon icon="account-circle"></iron-icon> ${user.name}</paper-item>
              <paper-item><iron-icon icon="cloud"></iron-icon> ${user.galaxy}</paper-item>
              <paper-item><iron-icon icon="language"></iron-icon> ${user.planet}</paper-item>
              <paper-item><iron-icon icon="mail"></iron-icon> ${user.email}</paper-item>
            </paper-card>
          `)}
        </section>
      `;
  }

  static get properties() {
    return {
      users: Array
    };
  }

  constructor() {
    super();
    firebase.database().ref('users').on('value', snapshot => {
      const payload = snapshot.val();
      this.users = [];
      for (const key in payload) {
        const user = payload[key];
        this.users = [...this.users, user];
      }
    });
  }

  _backPage() {
    this.dispatchEvent(new CustomEvent('page-changed', {
      detail: 'home'
    }));
  }
}

window.customElements.define('info-page', InfoPage);
