export type EventCallback = (...args: unknown[]) => void;
type Listeners = Record<string, EventCallback[]>;

export class EventBus {
  _listeners: Listeners;

  constructor() {
    this._listeners = {};
  }

  _preflightEvent(eventName: string) {
    if (!this._listeners[eventName]) {
      throw new Error(`Нет события ${eventName}`);
    }
  }

  on(eventName: string, eventCallback: EventCallback) {
    if (!this._listeners[eventName]) {
      this._listeners[eventName] = [];
    }

    this._listeners[eventName]?.push(eventCallback);
  }

  off(eventName: string, eventCallback: EventCallback) {
    this._preflightEvent(eventName);

    const updatedListeners = this._listeners[eventName]?.filter((listener) => listener !== eventCallback);

    this._listeners[eventName] = updatedListeners ?? [];
  }

  emit(eventName: string, ...args: unknown[]) {
    this._preflightEvent(eventName);

    this._listeners[eventName]?.forEach((listener) => {
      listener(...args);
    });
  }
}
