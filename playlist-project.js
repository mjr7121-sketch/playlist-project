/**
 * Copyright 2026 mjr7121-sketch
 * @license Apache-2.0, see LICENSE for full text.
 */
import { LitElement, html, css } from "lit";
import { DDDSuper } from "@haxtheweb/d-d-d/d-d-d.js";
import { I18NMixin } from "@haxtheweb/i18n-manager/lib/I18NMixin.js";

/**
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

    /*
    this.registerLocalization({
      context: this,
      localesPath:
        new URL("./locales/playlist-project.ar.json", import.meta.url).href +
        "/../",
    }*//*);*/
  }

  // Lit reactive properties
  static get properties() {
    return {
      ...super.properties,
      title: { type: String },
      index: {type: Number, reflect: true}
    };
  }

  updated(changedProperties){
    if(changedProperties.has("index")){
      const slides = this.querySelectorAll("playlist-slide");

      for(let i = 0; i < slides.length; i++){
        if(i == this.index){
          slides[i].style.display = "block";
        } else{
          slides[i].style.display = "none";
        }
      }
    }

  }

  // Lit scoped styles
  static get styles() {
    return [super.styles,
    css`
      :host {
        display: block;
        color: var(--ddd-theme-primary);
        background-color: var(--ddd-theme-accent);
        font-family: var(--ddd-font-navigation);
      }
      .wrapper {
        margin: var(--ddd-spacing-2);
        padding: var(--ddd-spacing-4);
      }
      h3 span {
        font-size: var(--playlist-project-label-font-size, var(--ddd-font-size-s));
      }
      
    `];
  }
  nextSlide(){
    if(this.index < 3){
      this.index++;
    }
  }
  previousSlide(){
    if(this.index > 0){
      this.index--;
    }
  }

  // Lit render the HTML
  render() {
    return html`
<div class="wrapper">
  <h3><span>${this.t.title}:</span> ${this.title}</h3>

  <button @click="${this.previousSlide}">Previous</button>
  <button @click="${this.nextSlide}">Next</button>
  
  <slot></slot>
</div>`;
  }

  /**
   * haxProperties integration via file reference
   */
  /*
  static get haxProperties() {
    return new URL(`./lib/${this.tag}.haxProperties.json`, import.meta.url)
      .href;
  }*/
}

globalThis.customElements.define(PlaylistProject.tag, PlaylistProject);