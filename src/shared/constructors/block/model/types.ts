import type { Block } from "./block";

export type PropsWithChildrenProps = Record<string, unknown>;

export type ChildrenProps = Record<string, Block>;

export type ListsProps = Record<string, Block[]>;

export type BlockProps = {
  attr?: Record<string, string>;
  events?: Record<string, EventCallback>;
  [key: string]: unknown;
};

export type EventCallback = (...args: unknown[]) => void;

export type EventListeners = Record<string, EventCallback[]>;
