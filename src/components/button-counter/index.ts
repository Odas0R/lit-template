import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("button-counter")
export class Counter extends LitElement {
  static styles = css`
    :host {
      color: blue;
    }
  `;

  @property({ type: Number })
  private counter: number = 0;

  render() {
    return html`
      <p>Hello, ${this.counter}</p>
      <button @click="${() => (this.counter = this.counter + 1)}">Click</button>
    `;
  }
}

customElements.define("button-counter", Counter);
