import { LitElement, html, css } from 'lit';

/**
 * Now it's your turn. Here's what we need to try and do
 * 1. 
 */

export class MyCard extends LitElement {

  static get tag() {
    return 'my-card';
  }

  constructor() {
    super();
    this.title ="My card";
    this.description="Default Description";
    this.imageUrl="https://via.placeholder.com/300";
    this.link="#"
    this.fancy = false;
  }

  static get styles() {
    return css`
      :host {
        display:inline-flex;
        border: 4px solid green;
        border-radius:8px;
        overflow:hidden;
        margin:16px;
        width:300px;
        height:400px
      }
      :host([fancy]) {
        display: inline-flex;
        background-color: pink;
        border: 2px solid fuchsia;
        box-shadow: 10px 5px 5px red;
      }

      .header{
        background-color:black;
        color:red;
        padding: 12px;
        text-align:center;
        font-size:20px;
      }
      .content{
        padding:16px;
      }
      .chip{
        background-color: #4CAF50;
        color: white;
        padding: 6px 20px;
        border-radius: 10px;
        display: inline-block;
        margin-top:10px;
        
      }
      .chip:hover{
        background-color: red;
      }
      .change-color {
        background-color: skyblue;
        color: black;
      }
      details summary {
        text-align: left;
        font-size: 20px;
        padding: 8px 0;
      }

      details[open] summary {
        font-weight: bold;
      }
  
      details div {
        border: 2px solid black;
        text-align: left;
        padding: 8px;
        height: 70px;
        overflow: auto;
      }
   `;
  }
  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.fancy = true;
    }
    else {
      this.fancy = false;
    }
  }
  render() {
    return html`
      <div class="header">${this.title}</div>
      <div class="content">
        <img src="${this.imageUrl}" alt="${this.title}" style="width: 100%;">
        <details ?open="${this.fancy}" @toggle="${this.openChanged}">
          <summary>Description</summary>
          <div>
            <slot>${this.description}</slot>
          </div>
        </details>
        <a href="${this.link}" target="_blank" class="chip">Details</a>
      </div>
      `;
  }

  static get properties() {
    return {
      title: { type: String },
      description: { type: String },
      imageUrl: { type: String },
      link: { type: String },
      fancy: { type: Boolean, reflect: true },
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);


document.querySelector('#duplicate').addEventListener('click', function(event) {
  const cardList = document.querySelector('.cardlst');
  const myCardElements = cardList.querySelectorAll('my-card');

  if (myCardElements.length < 10) {
    const lastCard = myCardElements[myCardElements.length - 1];
    const newCard = document.createElement('my-card');
    
    // Copy properties from the last card to the new card
    newCard.title = lastCard.title;
    newCard.imageUrl = lastCard.imageUrl;
    newCard.description = lastCard.description;
    newCard.link = lastCard.link;

    cardList.appendChild(newCard);
  }
});

document.querySelector('#changetitle').addEventListener('click', function(e) {
  const firstCard = document.querySelector('.cardlst my-card');
  if (firstCard) {
    firstCard.title = "Soccer";
  }
});

document.querySelector('#changeimage').addEventListener('click', function(e) {
  const firstCard = document.querySelector('.cardlst my-card');
  if (firstCard) {
    firstCard.imageUrl = "https://i.guim.co.uk/img/media/e5ecca89ea10fe9e02d82f14974ddee6e9abfdec/0_507_8000_4801/master/8000.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=e962e62f0cb3e7524c2870110483a9fc";
  }
});

document.querySelector('#changebg').addEventListener('click', function(e) {
  var cards = document.querySelectorAll('.cardlst my-card');
  cards.forEach(function(card) {
    card.shadowRoot.querySelector('div').classList.toggle('change-color');
  });
  
});


document.querySelector('#delete').addEventListener('click', function(e) {
  const cardList = document.querySelector('.cardlst');
  const myCardElements = cardList.querySelectorAll('my-card');
  if (myCardElements.length > 1) {
    const lastCard = myCardElements[myCardElements.length - 1];
    lastCard.remove();
  }
});