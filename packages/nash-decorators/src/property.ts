import { NashElement } from '@thorough/nash-element';

export interface IPropertyOptions {
  type?:
    | BooleanConstructor
    | DateConstructor
    | NumberConstructor
    | StringConstructor
    | ArrayConstructor
    | ObjectConstructor;
}

export const property = (options?: IPropertyOptions) => (
  proto: NashElement,
  propName: string
) => {
  console.log('property', proto);

  if (!proto.constructor.hasOwnProperty('properties')) {
    Object.defineProperty(proto.constructor, 'properties', {
      value: {}
    });
  }

  const { type } = options;

  // tslint:disable-next-line:no-any
  (proto.constructor as any).properties[propName] = type;
};
