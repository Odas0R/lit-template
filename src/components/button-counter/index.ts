import { LitElement, css, html } from "lit";
import { customElement, property } from "lit/decorators.js";

import { TW } from "../../util/tailwind-mixin";

@customElement("button-counter")
export class Counter extends TW(LitElement) {
  @property({ type: Number })
  private counter: number = 0;

  render() {
    return html`
      <p class="text-red-500">Hello, ${this.counter}</p>
      <button class="block m-5" @click="${() => (this.counter = this.counter + 1)}">Click</button>
    `;
  }
}
