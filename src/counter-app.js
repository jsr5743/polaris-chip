import { LitElement, html, css } from 'lit';


export class Counter extends LitElement {

  static get tag() {
    return 'counter-app';
  }

  constructor() {
    super();
    this.value=0;
    this.min=undefined;
    this.max=undefined;
  }
  connectedCallback() {
    super.connectedCallback();

    if (this.classList.contains('second-counter')) {
      // Only attach the event listener for the second counter
      this.addEventListener('value-changed', () => {
        if (this.value === 21) {
          this.makeItRain();
        }
      });
    }
  }

  static get styles() {
    return css`
      :host {
        display:inline-flex;
      }
      .box{
        max-width:100px;
        max-height:164px;
        background-color:skyblue;
        padding: 20px;
        text-align:center;
        font-size:20px;
        margin:20px auto;
      }
      .counter-num{
        border:16px;
        padding:4px;
        color:white;
        margin:30px;
        font-size:40px;
        text-align:center;
      }
      .addbtn{
        background-color: black;
        color:white;
        font-size:25px;
        padding: 6px 20px;
        border-radius: 10px;
        display: inline-block;
        margin-top:10px;
      }
      .addbtn:hover{
        background-color: lightgreen;
      }
      .addbtn:focus{
        background-color: pink;
      }
      .decbtn{
        background-color: black;
        color: white;
        font-size:25px;
        padding: 6px 20px;
        border-radius: 10px;
        display: inline-block;
        margin-top:10px;
      }
      .decbtn:hover{
        background-color: lightgreen;
      }
      .decbtn:focus{
        background-color: blue;
      }
   `;
  }

increase(){
  if (this.max === undefined || this.value < this.max) {
    this.value += 1;
  }

}
decrease(){
  if (this.min === undefined || this.value > this.min) {
    this.value -= 1;
  }
}

updated(changedProperties) {
  super.updated(changedProperties);
  if (changedProperties.has('value')) {
    if (this.value === 21) {
      this.makeItRain();
    }
  }
}

makeItRain() {
  import("@lrnwebcomponents/multiple-choice/lib/confetti-container.js").then(
    (module) => {
      setTimeout(() => {
        this.shadowRoot.getElementById("confetti").setAttribute("popped", "");
      }, 0);
    }
  );
}
  render() {
    var color = "white"
    if(this.value == this.max) color = "green";
    else if (this.value == this.min) color = "red";
    else if (this.value == 18) color = "purple";
    else if (this.value == 21) color = "yellow";


    return html`
      <confetti-container id="confetti">
        <div class="box">
        <span class="counter-num" style="color: ${color}">${this.value}</span>
          <button class="addbtn" @click="${this.increase}" ?disabled="${this.max === this.value}">+</button>
          <button class="decbtn" @click="${this.decrease}" ?disabled="${this.min === this.value}">-</button>
        </div>
      </confetti-container>
    `;
  }

  static get properties() {
    return {
      value: { type: Number, reflect:true},
      max: { type: Number, reflect:true},
      min: { type: Number, reflect:true},
    };
  }
} 

globalThis.customElements.define(Counter.tag, Counter);

