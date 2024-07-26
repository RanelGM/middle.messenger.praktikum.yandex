import { shouldChangeRoute } from "app/lib/shouldChangeRoute";
import { notificator } from "entities/notification";
import { Notifications } from "entities/notification/ui/notifications";
import { connect } from "entities/store";
import { userApi } from "entities/user";
import { Block, router } from "shared/constructors";
import { allRoutes } from "../lib/getRoutes";
import type { StoreState } from "entities/store";
import type { BlockProps } from "shared/constructors";

type MapProps = {
  isAuthorized: boolean;
  isLoadedOnce: boolean;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    isAuthorized: Boolean(state.userReducer.user.data) && state.userReducer.user.isLoadedOnce,
    isLoadedOnce: state.userReducer.user.isLoadedOnce,
  };
};

class App extends Block {
  private hasInitialized = false;

  constructor() {
    super();

    this.initLoaders();
    this.initNotifications();
  }

  private initRoutes() {
    allRoutes.forEach((route) => {
      router.use(route);
    });

    router.start();
  }

  private checkPrivateRoutes(isAuthorized: boolean) {
    const pathNameToChange = shouldChangeRoute(isAuthorized);

    if (pathNameToChange) {
      router.go(pathNameToChange);
    }
  }

  private initLoaders() {
    void userApi.getUser();
  }

  private initNotifications() {
    notificator.init(new Notifications());
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    const isFirstInit = !this.hasInitialized && newProps.isLoadedOnce;
    const isAfterInit = this.hasInitialized && oldProps.isAuthorized !== newProps.isAuthorized;

    if (isFirstInit) {
      this.hasInitialized = true;
      this.initRoutes();
    }

    if (isFirstInit || isAfterInit) {
      this.checkPrivateRoutes(newProps.isAuthorized);
    }

    return true;
  }
}

export const AppWithStore = connect(mapStateToProps, App);
