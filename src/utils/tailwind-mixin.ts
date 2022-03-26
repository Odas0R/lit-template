export const TW = <T extends LitMixin>(superClass: T): T =>
  class extends superClass {

    connectedCallback() {
      super.connectedCallback();

      const link = document.createElement("link");
      link.rel = "stylesheet";
      link.type = "text/css";
      link.href = "/css/main.css"

      if(this.shadowRoot) {
        this.shadowRoot.append(link);
      }
    }
  };
