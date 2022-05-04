import { LitElement, html, css } from "lit";
import { customElement, property } from "lit/decorators.js";

@customElement("simple-greeting-two")
export class SimpleGreetingTwo extends LitElement {
  static styles = css`
    @tailwind base;
    @tailwind utilities;
  `;

  @property()
  name?: string = "World";

  render() {
    return html`<p class="text-red-500">Hello, ${this.name}!</p>`;
  }
}
