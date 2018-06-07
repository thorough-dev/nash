import { NashElement } from '@thorough/nash-element';

export interface IStringable {
  toString(): string;
}

export interface INashComponentConfig {
  /**
   * An array of objects which have a `toString()` property which returns a
   * string of CSS.
   *
   * It is specified this way so that you can pass a String itself or a
   * Webpack module which can be converted to a string.
   */
  lazy?: boolean;
  registry?: CustomElementRegistry;
  styles?: IStringable[];
  use?: Array<typeof NashElement>;
}

/**
 * A convenience decorator for declaring and registering a Custom Element
 * at the same time.
 *
 * @param tagName Name to use as the element's tagName.
 */
export const component = (
  tagName: string,
  config: INashComponentConfig = {}
) => (klass: typeof NashElement) => {
  const {
    styles = [],
    use = [],
    // There is a proposed spec for allowing multiple CustomElementRegistry
    // instances on a single page. Support being explicit about the
    // registry but default to the global default.
    registry = customElements,
    lazy = false
  } = config;

  // tslint:disable-next-line:no-any
  (klass as any).styles = styles.map(s => s.toString());

  // TODO implement lazy-loading in connectedCallback
  // tslint:disable-next-line:no-any
  (klass as any).use = use;

  if (!lazy) {
    registry.define(tagName, klass);
  }
};
