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
        display:flex;
        flex-direction: column;
        align-items: center;
        justify-content: center; 
        min-width: 200vh;
        height: var(--ddd-spacing-92);
        width: var(--ddd-spacing-92);
        background-color: var(--ddd-theme-default-skyBlue); 
        padding: var(--ddd-spacing-5);
        margin: var(--ddd-spacing-4);
        text-align: center;
        border: var(--ddd-border-lg);
        border-color: var(--ddd-theme-default-potentialMidnight);
        border-radius: 5px; 
      }
      .party-members-container {
        display: inline-flex; /* Change to flex */
        flex-wrap: wrap; /* Wrap items if they exceed the container width */
        justify-content: center;
      }
      
      .party-member {
        display: flex 0 0 auto;
        margin: 0 10px;
      }

      .party-member rpg-character {
        margin-bottom: .5rem;
      }
      button{
          font-family: "Press Start 2P", system-ui;
          font-size: var(--ddd-font-size-3xs);
          color: var(--ddd-theme-default-white);
          margin: var(--ddd-spacing-3);
          padding: var(--ddd-spacing-5);
          border: var(--ddd-border-sm);
          border-color: var(--ddd-theme-default-nittanyNavy);
          background-color: var(--ddd-theme-default-coalyGray);
      }
      button:hover{
          background-color: var(--ddd-theme-default-creekLight);
          color: var(--ddd-theme-default-athertonViolet);
          transition: 0.5s ease-in-out
      }
      button:focus{
          background-color: var(--ddd-theme-default-shrineMaxLight);
          color: var(--ddd-theme-default-athertonViolet);
          transition: 0.3s ease-in-out
      }
      .rpg-characters{
        display: inline-flex; /* Change to flex */
        flex-wrap: wrap; /* Wrap items if they exceed the container width */
        justify-content: center;
        
      }
      
      
    `;
  }

  render() {
    return html`
    <confetti-container id="confetti">
    <div class="party-ui-container">
      <input type="text" placeholder="Enter username (lowercase letters and numbers only)">
      <button class="addbut" @click="${this.addUser}">Add User</button>
      
      <!-- <button class="rembut" @click="${this.removeUser}">Remove User</button> -->
      <div class="rpg-characters">
        <!-- RPG characters will be dynamically added here -->
      </div>
      
      <button class="savebut" @click="${() => {this.saveParty(); this.makeItRain();}}">Save Members to Party</button>
      <div class="party-members-container">
        ${this.partyMembers.map(member => html`
          <div class="party-member">
            
            <rpg-character seed="${member.username}"></rpg-character>
            <p>${member.username}</p>
          </div>
        `)}
      </div>
    </div>
    </confetti-container>
  `;
}
makeItRain() {
  import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      setTimeout(() => {
        this.shadowRoot.querySelector("#confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}

addUser() {
  const userInput = this.shadowRoot.querySelector('.party-ui-container input').value.toLowerCase().replace(/[^a-z0-9]/g, '');
  if (userInput) {
    const rpgCharactersContainer = this.shadowRoot.querySelector('.party-ui-container .rpg-characters');
    
    const characterContainer = document.createElement('div');
    characterContainer.classList.add('rpg-character');
    characterContainer.innerHTML = `
      <rpg-character seed="${userInput}"></rpg-character>
      <p>${userInput}</p>
      <button class="removebut">Remove User</button>
    `;
    characterContainer.querySelector('.removebut').addEventListener('click', () => this.removeUser(userInput));
    
    rpgCharactersContainer.appendChild(characterContainer);
    this.shadowRoot.querySelector('.party-ui-container input').value = '';
  }
}

removeUser(username) {
  const rpgCharactersContainer = this.shadowRoot.querySelector('.party-ui-container .rpg-characters');
  const characterToRemove = [...rpgCharactersContainer.querySelectorAll('.rpg-character')].find(character => character.querySelector('p').innerText.trim() === username);
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