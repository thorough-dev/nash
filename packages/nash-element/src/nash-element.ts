import { LitElement, html } from '@polymer/lit-element';
import { TemplateResult, svg } from 'lit-html';
import { repeat } from 'lit-html/lib/repeat';
export { html, TemplateResult, repeat, svg };

class StylesCache {
  cache: { [key: string]: HTMLStyleElement } = {};

  set(module) {
    const style = document.createElement('style');
    style.innerHTML = module.toString();
    this.cache[module.toString()] = style;
  }

  get(module) {
    if (!this.cache[module.toString()]) {
      this.set(module);
    }

    return this.cache[module.toString()].cloneNode(true);
  }
}

const styleCache = new StylesCache();

export abstract class NashElement extends LitElement {
  static inheritStyles = true;
  static styles: string[] = [];
  static stylesMarkup: string[];

  static gatherStyles(): string[] {
    if (!this.inheritStyles) {
      return this.styles;
    }

    const styles = [...this.styles];
    let parent = Object.getPrototypeOf(this);

    while (parent) {
      if (parent.styles) {
        styles.push(...parent.styles);
      }
      parent = Object.getPrototypeOf(parent);
    }

    return styles;
  }

  styleNodes: HTMLStyleElement[] = [];

  protected html = html;
  protected $repeat = repeat;

  dispatch(eventName: string, detail?: object) {
    this.dispatchEvent(
      new CustomEvent(eventName, { bubbles: true, composed: true, detail })
    );
  }

  _firstRendered() {
    const styles = (this.constructor as any).gatherStyles();
    this.styleNodes = styles.map(s => styleCache.get(s));
    this.styleNodes.forEach(node => this.shadowRoot.appendChild(node));
  }

  protected abstract _render(_);
}
