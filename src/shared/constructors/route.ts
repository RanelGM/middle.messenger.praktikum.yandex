import type { Block } from "./block";

type RouteProps = {
  pathname: string;
  root: string;
  blockInstance: typeof Block;
  blockProps?: Record<string, unknown>;
};

export class Route {
  _pathname: RouteProps["pathname"];
  _root: RouteProps["root"];
  _blockInstance: RouteProps["blockInstance"];
  _blockProps: RouteProps["blockProps"];
  _block: Block | null;

  constructor(props: RouteProps) {
    const { pathname, root, blockInstance, blockProps } = props;

    this._pathname = pathname;
    this._root = root;
    this._blockInstance = blockInstance;
    this._blockProps = blockProps;
    this._block = null;
  }

  matchPathname(pathname: string): boolean {
    return pathname === this._pathname;
  }

  navigate(pathname: string): void {
    if (this.matchPathname(pathname)) {
      this._pathname = pathname;
      this.render();
    }
  }

  leave(): void {
    if (this._block) {
      this._block.remove();
    }
  }

  render(): void {
    this._block = new this._blockInstance(this._blockProps);
    const root = document.querySelector(this._root);
    const content = this._block.getContent();

    if (root && content) {
      root.append(content);
    }
  }
}
