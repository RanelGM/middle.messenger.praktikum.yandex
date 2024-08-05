import { expect } from "chai";
import Sinon from "sinon";
import { Block } from "../../block";
import { Router } from "./router";
import type { BlockProps } from "../../block";

describe("Router", () => {
  let router: Router;
  let BlockComponent: typeof Block;

  beforeEach(() => {
    class Component extends Block {
      constructor(props: BlockProps) {
        super({ ...props });
      }

      render() {
        return /* HTML */ `<div id="app">{{ text }}</div>`;
      }
    }

    BlockComponent = Component;
    router = new Router({ root: "#app" });
    router.clearHistoryForTest();
  });

  describe("Initializer", () => {
    it("should call start", () => {
      const spy = Sinon.spy(router, "start");

      router.start();

      expect(spy.calledOnce).to.be.true;
    });

    it("should add and call _onRouteChange event after start", () => {
      const spy = Sinon.spy(router, "_onRouteChange");

      router.start();

      expect(spy.calledOnce).to.be.true;
    });
  });

  describe("Connector", () => {
    it("should connect route", () => {
      router.use({ pathname: "/path", page: BlockComponent }).start();

      expect(router.getRoutes().length).to.be.eq(1);
    });

    it("should find connected route", () => {
      const pathname = "/path";

      router.use({ pathname, page: BlockComponent }).start();
      const route = router.findRoute(pathname);
      const isMatching = route?.matchPathname(pathname);

      expect(isMatching).to.be.true;
    });
  });

  describe("Navigator", () => {
    it("should navigate to pathname", () => {
      const pathname = "/path";

      router.use({ pathname, page: BlockComponent }).start();
      router.go(pathname);

      const [lastRoute] = router.getRoutes();
      const isMatching = lastRoute?.matchPathname(pathname);

      expect(isMatching).to.be.true;
    });

    it("should go backwards", () => {
      const initialPath = "/path";
      const secondPath = "/secondPath";
      const thirdPath = "/thirdPath";
      const spy = Sinon.spy(router.getHistory() as History, "back");

      router
        .use({ pathname: initialPath, page: BlockComponent })
        .use({ pathname: secondPath, page: BlockComponent })
        .use({ pathname: thirdPath, page: BlockComponent })
        .start();

      router.go(secondPath);
      router.go(thirdPath);

      expect(spy.callCount).to.be.eq(0);
      router.back();
      expect(spy.callCount).to.be.eq(1);
    });

    it("should go forward", () => {
      const initialPath = "/path";
      const secondPath = "/secondPath";
      const thirdPath = "/thirdPath";
      const spy = Sinon.spy(router.getHistory() as History, "forward");

      router
        .use({ pathname: initialPath, page: BlockComponent })
        .use({ pathname: secondPath, page: BlockComponent })
        .use({ pathname: thirdPath, page: BlockComponent })
        .start();

      router.go(secondPath);
      router.go(thirdPath);

      router.back();
      expect(spy.callCount).to.be.eq(0);
      router.forward();
      expect(spy.callCount).to.be.eq(1);
    });
  });
});
