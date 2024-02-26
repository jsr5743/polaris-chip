import { LitElement, html, css } from 'lit';


export class campusAlert extends LitElement {

  static get tag() {
    return 'campus-alert';
  }

  constructor() {
    super();
    this.status ="Color";
    this.description ="something happened";
    this.imageUrl="https://via.placeholder.com/300";
    this.fancy = false;
    this.open = true;
    this.date = "";
    this.sticky = false;
  }

  static get styles() {
    return css`
      :host {
        display:inline-flex;
        overflow: hidden;
        width:100%;
      }
      :host([fancy]) {
        display: inline-flex;
        background-color: powderblue;
        box-shadow: 10px 5px 5px blue;
      }
      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .alert-container {
        display: inline-flex;
        overflow: hidden;
       
        
      }
      .header{
        margin-left:200px;
        margin-right:200px;
      }
      .content{
        padding:16px;
        margin-left:90px;
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
      img{
      
        width:10%;
        height:auto;
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
    <div class="alert-container">
      <!-- <div class="header">${this.status}</div> -->
      <div class="content">
        <img class="img" src="${this.imageUrl}" alt="${this.status}" style="width: 10%;">
        <details ?open="${this.open}" @toggle="${this.openChanged}">
          <summary>CAMPUS ALERT</summary>
          <div>
            <slot>${this.description}</slot>
          </div>
        </details>
      </div>
    </div>
      `;
  }

  static get properties() {
    return {
      status: { type: String },
      description: { type: String },
      imageUrl: { type: String },
      fancy: { type: Boolean, reflect: true },
      open: { type: Boolean },
      date: { type: String },
      sticky: { type: Boolean }, 
    };
  }
}

globalThis.customElements.define(campusAlert.tag, campusAlert);

