import { Route } from "./route";
import type { Block } from "./block";

type RouterProps = {
  root: string;
};

export type RegisterRoute = {
  pathname: string;
  page: typeof Block;
  pageProps?: Record<string, unknown>;
  isFallbackRoute?: boolean;
};

class Router {
  static __instance: Router | null;
  _root: RouterProps["root"] | undefined;
  _routes: Route[] | undefined;
  _currentRoute: Route | null | undefined;
  _history: History | undefined;
  _fallbackRoute: Route | null | undefined;

  constructor(props: RouterProps) {
    const { root } = props;

    if (Router.__instance) {
      return Router.__instance;
    }

    this._root = root;
    this._routes = [];
    this._currentRoute = null;
    this._history = window.history;
    this._fallbackRoute = null;
    Router.__instance = this;
  }

  start(): void {
    const handlePopstate = (evt: PopStateEvent) => {
      this._onRouteChange((evt.currentTarget as Window).location.pathname);
    };

    window.addEventListener("popstate", handlePopstate);
    this._onRouteChange(window.location.pathname);
  }

  use({ pathname, page, pageProps, isFallbackRoute }: RegisterRoute): this {
    if (!this._root) {
      return this;
    }

    const route = new Route({ pathname, blockInstance: page, blockProps: pageProps, root: this._root });
    this._routes?.push(route);

    if (isFallbackRoute) {
      this._fallbackRoute = route;
    }

    return this;
  }

  go(pathname: string, state: Record<string, unknown> = {}): void {
    this._history?.pushState(state, "", pathname);
    this._onRouteChange(pathname);
  }

  back(): void {
    this._history?.back();
  }

  forward(): void {
    this._history?.forward();
  }

  getRoute(pathname: string): Route | undefined {
    return this._routes?.find((route) => route.matchPathname(pathname));
  }

  _onRouteChange(pathname: string): void {
    const route = this.getRoute(pathname) ?? this._fallbackRoute;

    if (!route || !this._root || this._currentRoute === route) {
      return;
    }

    const rootElement = document.querySelector(this._root);

    if (rootElement) {
      rootElement.innerHTML = "";
      this._currentRoute = route;
      route.render();
    }
  }
}

export const router = new Router({ root: "#app" });
