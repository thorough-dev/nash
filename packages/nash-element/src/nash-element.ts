import { html, LitElement } from '@polymer/lit-element';
import { svg, TemplateResult } from 'lit-html';
import { repeat } from 'lit-html/lib/repeat';
import { StylesCache } from './styles-cache';
export { html, TemplateResult, repeat, svg };

const styleCache = new StylesCache();

export abstract class NashElement extends LitElement {
  public static inheritStyles = true;
  public static styles: string[] = [];
  public static stylesMarkup: string[];
  public static use;

  public static gatherStyles(): string[] {
    if (!this.inheritStyles) {
      return this.styles;
    }

    const styles = [...this.styles];
    let parent = Object.getPrototypeOf(this);

    while (parent) {
      if (parent.styles) {
        styles.unshift(...parent.styles);
      }
      parent = Object.getPrototypeOf(parent);
    }

    return styles;
  }

  public styleNodes: HTMLStyleElement[] = [];

  protected $repeat = repeat;
  protected html = html;

  public _firstRendered() {
    // tslint:disable-next-line:no-any
    const styles = (this.constructor as any).gatherStyles();
    this.styleNodes = styles.map(s => styleCache.get(s));
    // `_root` is private in LitElement and we need to access it
    // tslint:disable-next-line:no-any
    this.styleNodes.forEach(node => (this as any)._root.appendChild(node));
  }

  public dispatch(eventName: string, detail?: object) {
    this.dispatchEvent(
      new CustomEvent(eventName, { bubbles: true, composed: true, detail })
    );
  }

  protected abstract _render(_);
}
