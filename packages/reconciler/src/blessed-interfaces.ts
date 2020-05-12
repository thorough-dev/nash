import { EventEmitter } from 'events';

export interface BlessedRoot {
  screen(): Screen;
  box(options?: BoxOptions): Box;
  text(options?: TextOptions): Text;
  layout(options?: LayoutOptions): Layout;
}

// -- Node ----------------------------------------------------------------------------------------

interface NodeOptions {
  screen?: Screen;
}

export interface Node extends EventEmitter {
  append(node: Node): void;
  screen?: Screen;
}

// -- Screen --------------------------------------------------------------------------------------

export interface Screen extends Node {
  /** Render all child elements, writing all data to the screen buffer and drawing the screen. */
  render(): void;
}

// -- Element -------------------------------------------------------------------------------------

export interface Element extends Node {}

interface ElementOptions extends NodeOptions {
  /** Element's text content. */
  content?: string;
}

// -- Text ----------------------------------------------------------------------------------------

interface TextOptions extends ElementOptions {}

export interface Text extends Element {}

// -- Box -----------------------------------------------------------------------------------------

interface BoxOptions extends ElementOptions {}

export interface Box extends Element {}

// -- Layout --------------------------------------------------------------------------------------

interface LayoutOptions extends ElementOptions {}

export interface Layout extends Element {}
