/**
 * Copyright 2026 mjr7121-sketch
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";
import "./playlist-slide.js";
import "./slide-arrow.js";
import "./slide-indicator.js";

/**f
 * `playlist-project`
 * 
 * @demo index.html
 * @element playlist-project
 */
export class PlaylistProject extends DDDSuper(I18NMixin(LitElement)) {

  static get tag() {
    return "playlist-project";
  }

  constructor() {
    super();
    this.title = "";
    this.index = 0;
    this.t = this.t || {};
    this.t = {
      ...this.t,
      title: "Title",
    };


  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      index: {type: Number, reflect: true},
    };
  }

  firstUpdated(){
    const slides = this.querySelectorAll("playlist-slide");
    slides.forEach((slide, i) => {
      slide.active = i === this.index;
    })
  }

  updated(changedProperties){
    if(changedProperties.has("index")){
      const slides = this.querySelectorAll("playlist-slide");

      slides.forEach((slide, i) => {
        slide.active = i === this.index;
      }
      );
    }

  }


  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        position: relative;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-default-slateMaxLight);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
        display: flex;
        flex-direction: column;
      }
      h3 span {
        font-size: var(--playlist-project-label-font-size, var(--ddd-font-size-s));
      }

      
    `];
  }

nextSlide() {
    const slides = this.querySelectorAll("playlist-slide");
  if (this.index < slides.length - 1) {
    this.index++;
  }
}


previousSlide() {
  if (this.index > 0) {
    this.index--;
  }
}


  handleDotClick(e) {
    this.index = e.detail.index;
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper" @dot-clicked="${this.handleDotClick}">

  <playlist-arrow
    @prev-clicked="${this.previousSlide}"
    @next-clicked="${this.nextSlide}">
  </playlist-arrow>

  <slot></slot>

  <slide-indicator
  .total="${this.querySelectorAll('playlist-slide').length}"
  .currIndex="${this.index}">
  </slide-indicator>
</div>`;
  }


}

globalThis.customElements.define(PlaylistProject.tag, PlaylistProject);