import Handlebars from "handlebars";
import { EventBus } from "./event-bus";
import type { EventCallback } from "./event-bus";

type PropsWithChildrenProps = Record<string, unknown>;

type ChildrenProps = Record<string, Block>;

type BlockProps = {
  attr?: Record<string, string>;
  events?: Record<string, EventCallback>;
  [key: string]: unknown;
};

type ListsProps = Record<string, unknown[]>;

export class Block {
  static EVENTS = {
    INIT: "init",
    FLOW_CMD: "flow:component-did-mount",
    FLOW_CDU: "flow:component-did-update",
    FLOW_RENDER: "flow:render",
  };

  _element: HTMLElement | null = null;
  _id = "";
  props: BlockProps;
  children: ChildrenProps;
  lists: ListsProps;
  eventBus: () => EventBus;

  constructor(propsWithChildrenProps: PropsWithChildrenProps = {}) {
    const eventBus = new EventBus();
    const { children, props, lists } = this._getChildrenPropsAndProps(propsWithChildrenProps);

    this.props = this._makePropsProxy(props);
    this.children = children;
    this.lists = lists;
    this.eventBus = () => eventBus;
    this._registerEvents(eventBus);

    eventBus.emit(Block.EVENTS.INIT);
  }

  _getChildrenPropsAndProps(propsWithChildrenProps: PropsWithChildrenProps) {
    const children: ChildrenProps = {};
    const props: BlockProps = {};
    const lists: ListsProps = {};

    Object.entries(propsWithChildrenProps).forEach(([key, value]) => {
      if (value instanceof Block) {
        children[key] = value;

        return;
      }

      if (Array.isArray(value)) {
        lists[key] = value;

        return;
      }

      props[key] = value;
    });

    return { children, props, lists };
  }

  _makePropsProxy(blockProps: BlockProps): BlockProps {
    return new Proxy(blockProps, {
      get(target, prop: string) {
        const value = target[prop];

        // FIXME:
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return typeof value === "function" ? value.bind(value) : value;
      },
      set(target, prop: string, value) {
        const prevTarget = { ...target };

        target[prop] = value;
        (this as Block).eventBus().emit(Block.EVENTS.FLOW_CDU, prevTarget);

        return true;
      },
      deleteProperty() {
        throw new Error("Нет доступа");
      },
    });
  }

  _registerEvents(eventBus: EventBus) {
    eventBus.on(Block.EVENTS.INIT, this.init.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CMD, this._componentDidMount.bind(this));
    eventBus.on(Block.EVENTS.FLOW_CDU, this._componentDidUpdate.bind(this) as EventCallback);
    eventBus.on(Block.EVENTS.FLOW_RENDER, this._render.bind(this));
  }

  _addEvents() {
    const { events = {} } = this.props;
    Object.keys(events).forEach((eventName) => {
      const eventCallback = events[eventName];

      if (eventCallback) {
        this._element?.addEventListener(eventName, eventCallback);
      }
    });
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
    this.eventBus().emit(Block.EVENTS.FLOW_CMD);
  }

  _componentDidUpdate(prevProps: BlockProps, nextProps: BlockProps) {
    const hasUpdates = this.componentDidUpdate(prevProps, nextProps);

    if (hasUpdates) {
      this._render();
    }
  }

  componentDidUpdate(prevProps: BlockProps, nextProps: BlockProps) {
    return true;
  }

  get element() {
    return this._element;
  }

  addAttributes() {
    if (!this.element) {
      return;
    }

    const { attr = {} } = this.props;

    Object.entries(attr).forEach(([key, value]) => {
      this.element?.setAttribute(key, value);
    });
  }

  getContent() {
    return this.element;
  }

  _createDocumentElement(tagName: string) {
    return document.createElement(tagName);
  }

  show() {
    const element = this.getContent();

    if (element) {
      element.style.display = "block";
    }
  }

  hide() {
    const element = this.getContent();

    if (element) {
      element.style.display = "none";
    }
  }

  _render() {
    const propsAndStubs = { ...this.props };

    const tmpId = Math.floor(100_000 + Math.random() * 900_000);

    Object.entries(this.children).forEach(([key, child]) => {
      propsAndStubs[key] = `<div data-id="${child._id}"></div>`;
    });

    Object.entries(this.lists).forEach(([key, child]) => {
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

    Object.entries(this.lists).forEach(([key, child]) => {
      const listCont = this._createDocumentElement("template") as HTMLTemplateElement;

      child.forEach((item) => {
        if (item instanceof Block) {
          const content = item.getContent() ?? "";
          listCont.content.append(content);
        } else {
          // eslint-disable-next-line @typescript-eslint/restrict-template-expressions
          listCont.content.append(`${item}`);
        }
      });

      const stub = fragment.content.querySelector(`[data-id="__l_${tmpId}"]`);
      stub?.replaceWith(listCont.content);
    });

    const newElement = fragment.content.firstElementChild as HTMLElement | null;

    if (this._element && newElement) {
      this._element.replaceWith(newElement);
    }

    this._element = newElement;
    this._addEvents();
    this.addAttributes();
  }

  render() {
    return "";
  }
}
