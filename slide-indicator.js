import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";


export class SlideIndicator extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "slide-indicator";
  }

  render() {
  }
}

globalThis.customElements.define(SlideIndicator.tag, SlideIndicator);