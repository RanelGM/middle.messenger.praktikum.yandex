import { Route } from "./route";
import type { RegisterRoute } from "./types";

type RouterProps = {
  root: string;
};

export class Router {
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

  findRoute(pathname: string): Route | undefined {
    return this._routes?.find((route) => route.matchPathname(pathname));
  }

  getCurrentRoute(): Route | null | undefined {
    return this._currentRoute;
  }

  getRoutes(): Route[] {
    return this._routes ?? [];
  }

  getHistory(): History | undefined {
    return this._history;
  }

  clearHistoryForTest() {
    this._routes = [];
    this._currentRoute = null;
    this._history?.replaceState([], "");
  }

  _onRouteChange(pathname: string): void {
    const route = this.findRoute(pathname) ?? this._fallbackRoute;

    if (!route || !this._root || this._currentRoute === route) {
      return;
    }

    this._currentRoute = route;
    const rootElement = document.querySelector(this._root);

    if (rootElement) {
      rootElement.innerHTML = "";

      route.render();
    }
  }
}

export const router = new Router({ root: "#app" });
