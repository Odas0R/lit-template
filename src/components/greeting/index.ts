import { LitElement, html } from "lit";
import {customElement, property} from 'lit/decorators.js';
import { TW } from "@utils/tailwind-mixin";

@customElement("simple-greeting")
export class SimpleGreeting extends TW(LitElement) {
  @property()
  name?: string = "World";

  // Render the UI as a function of component state
  render() {
    return html`<p class="text-blue-500">Hello, ${this.name}!</p>`;
  }
}
