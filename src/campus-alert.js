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
      :host([sticky]) {
        position: sticky;
        top: 0;
        z-index: 1000;
      }
      .content{
        padding:8px;
        overflow:hidden;
        font-size:20px;
      }
      details[open] summary {
        font-weight: bold;
      }
      img{
        width:10%;
        height:auto;
        display:block
      }
      .container{
        display:flex;
      }
      .closed-container {
      display:flex;
      align-items: center;
      justify-content: center;
      width: 100%;
     }
      .open-container{
        width:100%;
      }
    `;
    }
  toggleAlert() { 
    this.open =!this.open; 
      }
  openview(){
    return html `
    <div class ="open-container">
      <div class="container">
        <div class="content">
        <svg xmlns="https://images.vexels.com/media/users/3/128917/isolated/preview/3fa111197f6aee0add60c05829d0f196-exclamation-point-icon.png" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>exclamation-point</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
          <details ?open="${this.open}" @toggle="${this.openChanged}">
            <summary>Close</summary>
            <div>
              <slot></slot>
            </div>
          </details>
        <div class="date">${this.date}</div>
      </div>
    </div>
  </div>
  `
  }
  closedview(){
      return html`
        <div class="closed-container">
        <div class="container">
          <div class="content">
            <div class ="closed-toggle-button" @click="${this.toggleAlert}">
            <svg xmlns="https://images.vexels.com/media/users/3/128917/isolated/preview/3fa111197f6aee0add60c05829d0f196-exclamation-point-icon.png" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>exclam</title><path d="M11,15H13V17H11V15M11,7H13V13H11V7M12,2C6.47,2 2,6.5 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20Z" /></svg>
            <svg xmlns="https://images.vexels.com/media/users/3/128917/isolated/preview/3fa111197f6aee0add60c05829d0f196-exclamation-point-icon.png" style="height: 50px; width: 50px;" viewBox="0 0 24 24"><title>arrow</title><path d="M7.41,8.58L12,13.17L16.59,8.58L18,10L12,16L6,10L7.41,8.58Z" /></svg>
            CAMPUS ALERT
          </div>
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
  // render() {
  //   return html`
  //     <div class="content">
  //       <img class="img" src="${"https://images.vexels.com/media/users/3/128917/isolated/preview/3fa111197f6aee0add60c05829d0f196-exclamation-point-icon.png"}" alt="${this.status}">
  //       <details ?open="${this.open}" @toggle="${this.openChanged}">
  //         <summary>CAMPUS ALERT</summary>
  //         <div>
  //           <slot></slot>
  //         </div>
  //       </details>
  //       <div class="date">${this.date}</div>
  //     </div>
  //     `;
  // }
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

