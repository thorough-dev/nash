export interface IPropertyOptions {
  type?:
    | BooleanConstructor
    | DateConstructor
    | NumberConstructor
    | StringConstructor
    | ArrayConstructor
    | ObjectConstructor;
}

export interface IElementPrototype {
  constructor: any;
}

export function property(options?: IPropertyOptions) {
  return (proto: IElementPrototype, propName: string) => {
    if (!proto.constructor.hasOwnProperty('properties')) {
      Object.defineProperty(proto.constructor, 'properties', {
        value: {}
      });
    }

    const { type } = options;
    proto.constructor.properties![propName] = type;
  };
}
