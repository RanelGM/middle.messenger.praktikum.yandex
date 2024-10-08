import Handlebars from "handlebars";
import { EventBus } from "../event-bus";
import type { BlockProps, ChildrenProps, EventCallback, ListsProps, PropsWithChildrenProps } from "../types";

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CDM: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: HTMLElement | null = null;
  _id = "";
  props: BlockProps;
  children: ChildrenProps;
  lists: ListsProps;
  eventBus: () => EventBus;

  constructor(propsWithChildren = {}) {
    const eventBus = new EventBus();
    const { props, children, lists } = this._getChildrenPropsAndProps(propsWithChildren);
    this.props = this._makePropsProxy({ ...props });
    this.children = children;
    this.lists = this._makeListsProxy({ ...lists });
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);
    eventBus.emit(Block.EVENTS.INIT);
  }

  _addEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([eventName, eventCallback]) => {
      this._element?.addEventListener(eventName, eventCallback);
    });
  }

  _removeEvents() {
    const { events = {} } = this.props;

    Object.entries(events).forEach(([eventName, eventCallback]) => {
      this._element?.removeEventListener(eventName, eventCallback);
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDM, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  init() {
    this.eventBus().emit(Block.EVENTS.FLOW_RENDER);
  }

  _componentDidMount() {
    this.componentDidMount();
    Object.values(this.children).forEach((child) => {
      child.dispatchComponentDidMount();
    });
  }

  componentDidMount() {
    //
  }

  dispatchComponentDidMount() {
    this.eventBus().emit(Block.EVENTS.FLOW_CDM);
  }

  _componentDidUpdate(oldProps: BlockProps, newProps: BlockProps) {
    const hasUpdates = this.componentDidUpdate(oldProps, newProps);

    if (hasUpdates) {
      this._render();
    }
  }

  componentDidUpdate(_oldProps: BlockProps, _newProps: BlockProps) {
    return true;
  }

  _getChildrenPropsAndProps(propsWithChildrenProps: PropsWithChildrenProps) {
    const children: ChildrenProps = {};
    const props: BlockProps = {};
    const lists: ListsProps = {};

    Object.entries(propsWithChildrenProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;
      } else if (Array.isArray(value)) {
        lists[key] = value as Block[];
      } else {
        props[key] = value;
      }
    });

    return { children, props, lists };
  }

  addAttributes(attrs?: Record<string, string>) {
    const attr = attrs ?? this.props.attr ?? {};

    Object.entries(attr).forEach(([key, value]) => {
      this._element?.setAttribute(key, value);
    });
  }

  removeAttributes(attrs: string[]) {
    attrs.forEach((attr) => {
      this._element?.removeAttribute(attr);
    });
  }

  setProps = (nextProps: BlockProps | undefined | null) => {
    if (!nextProps) {
      return;
    }

    Object.assign(this.props, nextProps);
  };

  setLists = (lists: ListsProps) => {
    if (!lists) {
      return;
    }

    Object.assign(this.lists, lists);
  };

  get element() {
    return this._element;
  }

  _render() {
    const propsAndStubs = { ...this.props };
    const tmpId = Math.floor(100_000 + Math.random() * 900_000);

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, _child]) => {
      propsAndStubs[key] = `<div data-id="__l_${tmpId}"></div>`;
    });

    const fragment = this._createDocumentElement("template") as HTMLTemplateElement;
    fragment.innerHTML = Handlebars.compile(this.render())(propsAndStubs);

    Object.values(this.children).forEach((child) => {
      const stub = fragment.content.querySelector(`[data-id="${child._id}"]`);
      const childContent = child.getContent();

      if (stub && childContent) {
        stub.replaceWith(childContent);
      }
    });

    Object.entries(this.lists).forEach(([_key, child]) => {
      const listCont = this._createDocumentElement("template") as HTMLTemplateElement;
      child.forEach((item) => {
        if (item instanceof Block) {
          listCont.content.append(item.getContent() ?? "");
        } else {
          listCont.content.append(`${item}`);
        }
      });
      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      stub?.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild as HTMLElement | null;

    this._removeEvents();

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
    this.addAttributes();
    this._componentDidMount();
  }

  render() {
    return "";
  }

  getContent() {
    return this.element;
  }

  _makePropsProxy(props: BlockProps): BlockProps {
    const self = this;

    return new Proxy(props, {
      get(target, prop: string): unknown {
        const value = target[prop];

        return typeof value === "function" ? value.bind(target) : value;
      },
      set(target, prop: string, value) {
        const oldTarget = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  _makeListsProxy(lists: ListsProps): ListsProps {
    const self = this;

    return new Proxy(lists, {
      set(target, prop: string, value: Block[]) {
        const oldTarget: ListsProps = { ...target };
        target[prop] = value;
        self.eventBus().emit(Block.EVENTS.FLOW_CDU, oldTarget, target);

        return true;
      },
      deleteProperty() {
        throw new Error("No access");
      },
    });
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const element = this.getContent();

    if (element) {
      element.classList.remove("visually-hidden");
    }
  }

  hide() {
    const element = this.getContent();

    if (element) {
      element.classList.add("visually-hidden");
    }
  }

  remove() {
    const element = this.getContent();

    if (element) {
      element.remove();
    }
  }
}
