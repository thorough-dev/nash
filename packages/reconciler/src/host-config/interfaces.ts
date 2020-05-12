import { HostConfig, OpaqueHandle } from 'react-reconciler';

import { BlessedRoot, Node, Screen } from '../blessed-interfaces';

export { OpaqueHandle };

export type Callback = () => void | null | undefined;

export type Type = 'box' | 'layout';

export type Props = any;

export interface Container {
  screen: Screen;
  blessed: BlessedRoot;
}

export type Instance = Node;

export type TextInstance = any;

export type HydratableInstance = any;

export type PublicInstance = any;

export interface HostContext {
  blessed: BlessedRoot;
  screen: Screen;
}

export type UpdatePayload = any;

export type ChildSet = any;

export type TimeoutHandle = any;

export type NoTimeout = any;

export type BlessedHostConfig = HostConfig<
  Type,
  Props,
  Container,
  Instance,
  TextInstance,
  HydratableInstance,
  PublicInstance,
  HostContext,
  UpdatePayload,
  ChildSet,
  TimeoutHandle,
  NoTimeout
>;
