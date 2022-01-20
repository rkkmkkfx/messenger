import { isEqual } from '../utils';
import { createDomElement, updateDomProps } from './dom-utils';
import requestIdleCallback from './requestIdleCallback';

// Effect tags
const PLACEMENT = 1;
const DELETION = 2;
const UPDATE = 3;

const ENOUGH_TIME = 1;

// Global state
const updateQueue: Creact.QueueItem = [];
let nextUnitOfWork: Nullable<Creact.Fiber> = null;
let pendingCommit: Nullable<Creact.Fiber> = null;

function getRoot(fiber: Creact.Fiber) {
  let node = fiber;
  while (node.parent) {
    node = node.parent;
  }

  return node;
}

function createInstance(fiber: Creact.Fiber) {
  const { type: Instance, props } = fiber;

  if (Instance && typeof Instance !== 'string') {
    const instance = new Instance(props);
    instance.__fiber = fiber;
    return instance;
  }

  return null;
}

function reconcileChildrenArray(fiber: Creact.Fiber, newChildElements: JSX.Element | JSX.Element[]) {
  const elements = Array.isArray(newChildElements) ? newChildElements : [newChildElements];
  const wipFiber = fiber;

  let index = 0;
  let oldFiber = fiber.alternate ? fiber.alternate.child : null;
  let newFiber: Nullable<Creact.Fiber> = null;
  while (index < elements.length || oldFiber) {
    const prevFiber = newFiber;
    const element = index < elements.length && elements[index];
    const sameType = oldFiber && element && element.type === oldFiber.type;

    if (sameType && oldFiber) {
      newFiber = {
        type: oldFiber.type,
        tag: oldFiber.tag,
        stateNode: oldFiber.stateNode,
        props: element.props,
        parent: wipFiber,
        alternate: oldFiber,
        effectTag: UPDATE,
      };
    }

    if (element && !sameType) {
      newFiber = {
        type: element.type,
        tag:
          typeof element.type === 'string' ? 'host' : 'class',
        props: element.props,
        parent: wipFiber,
        effectTag: PLACEMENT,
      };
    }

    if (oldFiber && !sameType) {
      oldFiber.effectTag = DELETION;
      wipFiber.effects = fiber.effects || [];
      wipFiber.effects.push(oldFiber);
    }

    if (oldFiber) {
      oldFiber = oldFiber.sibling;
    }

    if (newFiber) {
      if (index === 0) {
        wipFiber.child = newFiber;
      } else if (prevFiber && element) {
        prevFiber.sibling = newFiber;
      }
    }

    index++;
  }
}

function updateHostComponent(fiber: Creact.Fiber) {
  const updated = fiber;
  if (!updated.stateNode) {
    updated.stateNode = createDomElement(updated);
  }

  const newChildElements = updated.props.children;
  if (newChildElements) {
    reconcileChildrenArray(updated, newChildElements);
  }
}

function updateClassComponent(fiber: Creact.Fiber) {
  const nextFiber = fiber;
  let prevInstance: Nullable<Creact.Component> = nextFiber.stateNode;
  if (!prevInstance) {
    // Call class constructor
    prevInstance = createInstance(nextFiber);
    nextFiber.stateNode = prevInstance;
    if (!prevInstance) {
      return;
    }
  }

  if (isEqual(prevInstance.props, nextFiber.props)) {
    // ToDo: figure out how to update component
    //  if it's props not changed, but the global store does
  }

  prevInstance.props = nextFiber.props;

  const newChildElements = nextFiber.stateNode?.render();
  reconcileChildrenArray(nextFiber, newChildElements);
}

function commitDeletion(fiber: Creact.Fiber, domParent: Node | Creact.Component) {
  let node = fiber;
  while (true) {
    if (node.tag === 'class' && node.child) {
      node = node.child;
      // eslint-disable-next-line no-continue
      continue;
    }
    if ('removeChild' in domParent && node.stateNode instanceof Node) {
      if (domParent.contains(node.stateNode)) {
        domParent.removeChild(node.stateNode);
      }
    }
    while (node !== fiber && !node.sibling && node.parent) {
      node = node.parent;
    }
    if (node === fiber) {
      return;
    }
    if (node.sibling) {
      node = node.sibling;
    }
  }
}

function completeWork(fiber: Creact.Fiber) {
  const updatedFiber = fiber;
  if (updatedFiber.tag === 'class' && updatedFiber.stateNode && !(updatedFiber.stateNode instanceof Node)) {
    updatedFiber.stateNode.__fiber = fiber;
  }

  if (updatedFiber.parent) {
    const childEffects = fiber.effects || [];
    const thisEffect = fiber.effectTag != null ? [fiber] : [];
    const parentEffects = updatedFiber.parent.effects || [];
    updatedFiber.parent.effects = parentEffects.concat(childEffects, thisEffect);
  } else {
    pendingCommit = fiber;
  }
}

function resetNextUnitOfWork() {
  const tick = updateQueue.shift();
  if (!tick) {
    return;
  }

  let root;
  if (tick.from === 'root') {
    if (tick.dom && !(tick.dom instanceof HTMLElement)) {
      root = tick.dom._rootContainerFiber;
    }
  } else if (tick.instance?.__fiber) {
    root = getRoot(tick.instance.__fiber);
  }

  nextUnitOfWork = {
    tag: 'root',
    stateNode: tick.dom ?? root?.stateNode,
    props: tick.newProps ?? root?.props ?? {},
    alternate: root,
  };
}

function beginWork(wipFiber: Creact.Fiber) {
  if (wipFiber.tag === 'class') {
    updateClassComponent(wipFiber);
  } else {
    updateHostComponent(wipFiber);
  }
}

function performUnitOfWork(wipFiber: Creact.Fiber): Creact.Fiber | null {
  beginWork(wipFiber);
  if (wipFiber.child) {
    return wipFiber.child;
  }

  let uow: Creact.Fiber | undefined = wipFiber;
  while (uow) {
    completeWork(uow);
    if (uow.sibling) {
      return uow.sibling;
    }
    uow = uow.parent;
  }
  return null;
}

function commitWork(fiber: Creact.Fiber) {
  if (fiber.tag === 'root') {
    return;
  }

  let domParentFiber = fiber.parent;
  while (domParentFiber?.tag === 'class') {
    domParentFiber = domParentFiber?.parent;
  }
  const domParent = domParentFiber?.stateNode;

  if (domParent) {
    if (fiber.effectTag === PLACEMENT && fiber.tag === 'host'
      && 'appendChild' in domParent && fiber.stateNode instanceof Node) {
      if (![...domParent.childNodes].some((node) => fiber.stateNode.isSameNode(node))) {
        domParent?.append(fiber.stateNode);
      }
    } else if (fiber.effectTag === UPDATE && fiber.tag === 'host' && fiber.alternate) {
      updateDomProps(fiber.stateNode, fiber.alternate.props, fiber.props);
    } else if (fiber.effectTag === DELETION) {
      commitDeletion(fiber, domParent);
    }
  }
}

function commitAllWork(fiber: Creact.Fiber) {
  const updatedFiber = fiber;
  updatedFiber.effects?.forEach((f) => {
    commitWork(f);
  });
  if (updatedFiber.stateNode && !(updatedFiber.stateNode instanceof Node)) {
    updatedFiber.stateNode._rootContainerFiber = fiber;
  }
  nextUnitOfWork = null;
  pendingCommit = null;
}

function workLoop(deadline: IdleDeadline) {
  if (!nextUnitOfWork) {
    resetNextUnitOfWork();
  }
  while (nextUnitOfWork && deadline.timeRemaining() > ENOUGH_TIME) {
    nextUnitOfWork = performUnitOfWork(nextUnitOfWork);
  }
  if (pendingCommit) {
    commitAllWork(pendingCommit);
  }
}

function performWork(deadline: IdleDeadline) {
  workLoop(deadline);
  if (nextUnitOfWork || updateQueue.length > 0) {
    requestIdleCallback(performWork);
  }
}

export function scheduleUpdate(instance: Creact.Component): void {
  updateQueue.push({
    from: 'class',
    instance,
  });
  requestIdleCallback(performWork);
}

/**
 * Page rendering function
 * @param {JSX.Element} children - page content
 * @param {HTMLElement} dom - the place we render to
 */
export function render(children: JSX.Element, dom: HTMLElement): void {
  updateQueue.push({
    dom,
    from: 'root',
    newProps: { children },
  });
  requestIdleCallback(performWork);
}
