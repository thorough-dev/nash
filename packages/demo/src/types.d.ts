declare module 'neo-blessed' {
  export * from 'blessed';
}

declare namespace JSX {
  interface IntrinsicElements {
    box: any;
    layout: any;
  }
}
