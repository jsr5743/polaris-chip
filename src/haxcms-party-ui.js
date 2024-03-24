import { LitElement, html, css } from 'lit';
import { DDD } from "@lrnwebcomponents/d-d-d/d-d-d.js";
import "@lrnwebcomponents/rpg-character/rpg-character.js";

export class HaxcmsPartyUI extends DDD {

  static get tag() {
    return 'haxcms-party-ui';
  }
  constructor() {
    super();
    this.partyMembers = [];
  }


  static get styles() {
    return css`
      :host {
        display:inline-flex;
      }
      .party-ui-container {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        background-color: #568EA3;
        
      }

      .rpg-characters {
        display: flex;
        flex-wrap: wrap;
        justify-content: center;
        gap: 1rem;
        margin-top: 1rem;
      }

      .rpg-character {
        display: flex;
        flex-direction: column;
        align-items: center;
        margin-bottom: 1rem;
      }
      .party-members-container {
        margin-top: 1rem;
        background-color: #FFE8D1;
      }

      .party-member {
        display: inline-flex;
        align-items: center;
        margin-bottom: 0.5rem;
      }

      .party-member p {
        margin-right: 1rem;
      }
    `;
  }

  render() {
    return html`
    <div class="party-ui-container">
      <input type="text" placeholder="Enter username (lowercase letters and numbers only)">
      <button @click="${this.addUser}">Add User</button>
      <div class="rpg-characters">
        <!-- RPG characters will be dynamically added here -->
      </div>
      <button @click="${this.saveParty}">Save Members to Party</button>
      <div class="party-members-container">
        ${this.partyMembers.map(member => html`
          <div class="party-member">
            <p>${member.username}</p>
            <rpg-character seed="${member.username}"></rpg-character>
          </div>
        `)}
      </div>
    </div>
  `;
}

addUser() {
  const userInput = this.shadowRoot.querySelector('.party-ui-container input').value.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (userInput) {
    const rpgCharactersContainer = this.shadowRoot.querySelector('.party-ui-container .rpg-characters');
    const rpgCharacter = document.createElement('rpg-character');
    rpgCharacter.setAttribute('seed', userInput);
    rpgCharacter.innerHTML = `<p>${userInput}</p><button @click="${() => this.removeUser(userInput)}">X</button>`;
    rpgCharactersContainer.appendChild(rpgCharacter);
    this.shadowRoot.querySelector('.party-ui-container input').value = '';
  }
}

removeUser(username) {
  const rpgCharactersContainer = this.shadowRoot.querySelector('.party-ui-container .rpg-characters');
  const characterToRemove = [...rpgCharactersContainer.querySelectorAll('rpg-character')].find(character => character.innerText.trim() === username);
  if (characterToRemove) {
    rpgCharactersContainer.removeChild(characterToRemove);
  }
}

saveParty() {
  const rpgCharactersContainer = this.shadowRoot.querySelector('.party-ui-container .rpg-characters');
  const partyMembers = [...rpgCharactersContainer.querySelectorAll('rpg-character')].map(character => {
    return { 
      username: character.getAttribute('seed')
    };
  });
  this.partyMembers = partyMembers;
  this.requestUpdate(); // Trigger re-render
}

}
customElements.define(HaxcmsPartyUI.tag, HaxcmsPartyUI);