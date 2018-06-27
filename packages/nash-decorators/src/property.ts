export interface IPropertyOptions {
  type?:
    | BooleanConstructor
    | DateConstructor
    | NumberConstructor
    | StringConstructor
    | ArrayConstructor
    | ObjectConstructor;
}

// tslint:disable-next-line:only-arrow-functions
export function property(options?: IPropertyOptions) {
  return (proto: any, propName: string) => {
    if (!proto.constructor.hasOwnProperty('properties')) {
      Object.defineProperty(proto.constructor, 'properties', {
        value: {}
      });
    }

    const { type } = options;

    // tslint:disable-next-line:no-any
    (proto.constructor as any).properties[propName] = type;
  };
}
