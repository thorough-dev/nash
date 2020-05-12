import ReactReconciler, { FiberRoot } from 'react-reconciler';

import { BlessedRoot } from './blessed-interfaces';
import hostConfig from './host-config';
import { Callback, Container } from './host-config/interfaces';

const BlessedReconciler = {
  withBlessed: (blessed: BlessedRoot) => {
    const reconciler = ReactReconciler(hostConfig);
    const roots = new Map<Container, FiberRoot>();

    return {
      render: (
        element: any,
        container: Container,
        callback: Callback = () => {}
      ) => {
        let root = roots.get(container);

        if (!root) {
          root = reconciler.createContainer(container, false, false);
          roots.set(container, root);
        }

        reconciler.updateContainer(element, root, null, callback);

        container.screen.render();

        return reconciler.getPublicRootInstance(root);
      },
    };
  },
};

export default BlessedReconciler;
