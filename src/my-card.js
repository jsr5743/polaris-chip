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
    this.title = "My card";
    this.description="Default Description";
    this.imageUrl="https://via.placeholder.com/300";
    this.link="#"
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
      }
      .chip:hover{
        background-color: red;
      }
   `;
  }
  render() {
    return html`
      <div class="header">${this.title}</div>
      <div class="content">
        <img src="${this.imageUrl}" alt="${this.title}" style="width: 100%;">
        <p>${this.description}</p>
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
    };
  }
}

globalThis.customElements.define(MyCard.tag, MyCard);
