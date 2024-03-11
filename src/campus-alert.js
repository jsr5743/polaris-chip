import { LitElement, html, css } from 'lit';
export class campusAlert extends LitElement {

  static get tag() {
    return 'campus-alert';
  }

  constructor() {
    super();
    this.status ="Color";
    this.description ="something happened";
    this.open = true;
    this.date = "";
    this.sticky = false;
    // this.open = localStorage.getItem("campus-alert-opened-state") !== "false";
    const storedState = localStorage.getItem("campus-alert-opened-state");
    this.open = storedState === null ? true : storedState !== "false";
  }

  static get styles() {
    return css`
      :host{
        display:flex;
        width:100%;
      }
      :host([status="Notice"]) .container{
        background-color: var(--notice-bg, #2d85c0);
      }
      :host([status="Warning"]) .container{
        background-color: var(--warning-bg, #e8e414);
      }
      :host([status="Alert"]) .container {
        background-color: var(--alert-bg, #ff1900);
      }
      :host([status="Custom"]) .container {
        background-color: var(--custom-bg, #999); /* Default to gray */
      }
      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      /* .content{
        padding:8px;
        overflow:hidden;
        font-size:20px;      
        text-align: center;
        width: 100%;
        height: 100%;
        position:relative;
      } */
      details[open] summary {
        font-weight: bold;
      }
      .container{
        transform: skew(10deg);
        text-align: center;
        width: 50%;
        height: 100%;
      }
      .closed-container {
      display:flex;
      align-items: center;
      justify-content: center;
      width: 100%;
      height:90px;
      background-color:lightblue;
     }
      .open-container{
        display: flex;
        justify-content: center;
        align-items: center;
        background-color: lightblue;
        width: 100%;
        margin-bottom: 8px;
        height:80px;
      }
      .date{       
        transform: skew(0deg);
        width: 15%;
        font-weight: bold;
      }
      .close-button{
        cursor: pointer;
        background: none;
        border: none;
        font-size: 20px;
        margin-left:90px;
        
      }
      .button-wrapper{
        width:15%;
      }
      .closed-toggle-button{
        cursor: pointer;
        background: none;
        border: none;
        font-size: 20px;
        margin-left:90px;
      }
      .open-button{
        cursor: pointer;
        background:none;
        border: none;
        font-size: 20px;
       
        
      }
    `;
    }
  toggleAlert() { 
    this.open =!this.open; 
    if (this.open) {
      const oppositeButton = this.shadowRoot.querySelector('.close-button');
      localStorage.removeItem("campus-alert-opened-state");
    } else {
      const oppositeButton = this.shadowRoot.querySelector('.open-button');
      // Update the localStorage value if the alert is closed
      localStorage.setItem("campus-alert-opened-state", this.open);
    }
    if (oppositeButton) {
      oppositeButton.focus();
    }
    }
  openview(){
    return html `
    <div class ="open-container">
      <div class="date">${this.date}</div>
      <div class="container">
        <div>
        <svg xmlns="https://images.vexels.com/media/users/3/128917/isolated/preview/3fa111197f6aee0add60c05829d0f196-exclamation-point-icon.png" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>exclamation-point</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg> 
        <slot></slot>
        </div>
      </div>
      <div class="button-wrapper">
          <button class="close-button" @click="${this.toggleAlert}" tabindex="0">X Close</button>
      </div>
    </div>
  `
  }
  closedview(){
      return html`
        <div class="closed-container">
          <div class="container">
              <div class ="closed-toggle-button" @click="${this.toggleAlert}">
                <svg xmlns="https://images.vexels.com/media/users/3/128917/isolated/preview/3fa111197f6aee0add60c05829d0f196-exclamation-point-icon.png" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>exclam</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
                CAMPUS ALERT
                <button class="open-button" tabindex="0">
                <svg xmlns="https://images.vexels.com/media/users/3/128917/isolated/preview/3fa111197f6aee0add60c05829d0f196-exclamation-point-icon.png" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>arrow</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
                </button>
            </div>
          </div>
        </div>
      `;
    }
  
  openChanged(e) {
    console.log(e.newState);
    if (e.newState === "open") {
      this.open = true;
    }
    else {
      this.open = false;
    }
  }

  render() {
    return this.open ? this.openview() : this.closedview();
  }

  static get properties() {
    return {
      status: { type: String },
      description: { type: String },
      open: { type: Boolean },
      date: { type: String },
      sticky: { type: Boolean }, 
    };
  }
}

globalThis.customElements.define(campusAlert.tag, campusAlert);

