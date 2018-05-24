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
  styles?: IStringable[];
  use?: any[];
  registry?: CustomElementRegistry;
  lazy?: boolean;
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
) => (klass: any) => {
  const {
    styles = [],
    use = [],
    // There is a proposed spec for allowing multiple CustomElementRegistry
    // instances on a single page. Support being explicit about the
    // registry but default to the global default.
    registry = customElements,
    lazy = false
  } = config;

  klass.styles = styles.map(s => s.toString());

  // TODO implement lazy-loading in connectedCallback
  klass.use = use;

  if (!lazy) {
    registry.define(tagName, klass);
  }
};
