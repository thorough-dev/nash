import { BlessedHostConfig } from './interfaces';

const hostConfig: BlessedHostConfig = {
  isPrimaryRenderer: true,
  supportsPersistence: false,
  supportsHydration: false,
  noTimeout: undefined, // TODO What is this supposed to be?
  now: Date.now,

  getPublicInstance(instance) {
    return instance;
  },

  getRootHostContext({ blessed, screen }) {
    return { blessed, screen };
  },

  getChildHostContext(parentHostContext, type, { blessed, screen }) {
    return { blessed, screen };
  },

  prepareForCommit: (containerInfo) => {},

  resetAfterCommit: (containerInfo) => {},

  createInstance: (
    type,
    props,
    rootContainerInstance,
    { screen, blessed },
    internalInstanceHandle
  ) => {
    const { children, ...restProps } = props;

    if (type === 'box') {
      const instance = blessed.box({
        ...restProps,
        screen,
      });

      return instance;
    } else if (type === 'layout') {
      return blessed.layout({ ...restProps, screen });
    }

    return blessed.text({ content: `${type}`, screen });
  },

  finalizeInitialChildren: (
    parentInstance,
    type,
    props,
    rootContainerInstance,
    hostContext
  ) => {
    return true;
  },

  prepareUpdate: (
    instance,
    type,
    oldProps,
    newProps,
    rootContainerInstance,
    hostContext
  ) => {
    return null;
  },

  shouldSetTextContent: (type, props) => {
    return false;
  },

  shouldDeprioritizeSubtree: (type, props) => {
    return !!props.hidden;
  },

  createTextInstance: (
    text,
    rootContainerInstance,
    { blessed, screen },
    internalInstanceHandle
  ) => {
    console.log('createTextInstance', text);
    return blessed.text({ content: text, screen });
  },

  scheduleDeferredCallback: (callback, options?) => {},

  cancelDeferredCallback: (callbackID) => {},

  setTimeout,
  clearTimeout,

  commitTextUpdate: (textInstance, oldText, newText) => {
    console.log('commitTextUpdate');
    textInstance.screen?.render();
  },

  commitMount: (instance, type, newProps, internalInstanceHandle) => {
    console.log('commitMount');
    instance.screen?.render();
  },

  commitUpdate: (
    instance,
    updatePayload,
    type,
    oldProps,
    newProps,
    internalInstanceHandle
  ) => {
    instance.screen?.render();
  },

  //
  // Mutation functionalities
  //

  supportsMutation: true,

  appendChild: (parentInstance, child) => {
    parentInstance.append(child);
  },

  appendChildToContainer: (container, child) => {
    container.screen.append(child);
  },

  appendInitialChild: (parentInstance, child) => {
    console.log('appendInitialChild');
    parentInstance.append(child);
  },

  insertBefore: (parentInstance, child, beforeChild) => {
    console.log('insertBefore');
  },

  insertInContainerBefore: (container, child, beforeChild) => {
    console.log('insertInContainerBefore');
  },

  removeChild: (parentInstance, child) => {
    console.log('removeChild');
  },

  removeChildFromContainer: (container, child) => {
    console.log('removeChildFromContainer');
  },

  resetTextContent: (instance) => {
    console.log('resetTextContent');
  },
};

export default hostConfig;
