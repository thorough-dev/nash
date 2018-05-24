import { html, TemplateResult } from 'lit-html';

class TagMarkupBuilder {
  private attrs = [];
  private inner = [];

  constructor(private tagName: string) {}

  setAttrs(attrs: object) {
    this.attrs = Object.entries(attrs);
    return this;
  }

  setInner(pieces: any[]) {
    this.inner = pieces;
    return this;
  }

  build() {
    const strings = [];
    const values = [];

    let prefix = `<${this.tagName}`;

    // Opening the tag
    if (this.attrs.length) {
      this.attrs.forEach(([name, value]) => {
        strings.push(`${prefix} ${name}="`);
        values.push(value);
        prefix = `"`;
      });
    }

    prefix += `>`;

    if (this.inner.length) {
      // Set the tag's inner contents
      this.inner.forEach(piece => {
        if (piece instanceof TemplateResult) {
          strings.push(prefix);
          values.push(piece);
          if (this.inner.length === 1) {
            strings.push(``);
          }
        } else {
          strings.push(`${prefix}${piece}`);
        }
        prefix = ``;
      });

      strings[strings.length - 1] += `${prefix}</${this.tagName}>`;
    } else {
      // Closing the tag
      strings.push(`${prefix}</${this.tagName}>`);
    }

    return { strings, values };
  }
}

export const nashLitToArgs = (tagName: string, attrs = {}, ...pieces) =>
  new TagMarkupBuilder(tagName)
    .setAttrs(attrs || {})
    .setInner(pieces)
    .build();

export const nashLit = (tagName: string, attrs = {}, ...pieces) => {
  const { strings, values } = nashLitToArgs(tagName, attrs, ...pieces);
  return html(strings as any, ...values);
};
