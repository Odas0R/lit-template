import { LitElement, html, css } from "lit";
import { customElement } from "lit/decorators.js";

import "@components/simple-greeting";
import "@components/simple-greeting-two";

@customElement("index-page")
export class IndexPage extends LitElement {
  static styles = css`
    @tailwind base;
    @tailwind utilities;
  `;

  render() {
    return html`
      <div class="p-4 border border-black drop-shadow-lg">
        <simple-greeting-two></simple-greeting-two>
        <simple-greeting></simple-greeting>
      </div>
    `;
  }
}
