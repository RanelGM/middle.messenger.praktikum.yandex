import { AppRoutes } from "shared/constants";
import { router } from "shared/constructors";
import { authRoutes, nonAuthRoutes } from "./getRoutes";

export const shouldChangeRoute = (isAuthorized: boolean) => {
  const currentRoute = router.getCurrentRoute();

  if (!currentRoute) {
    return null;
  }

  if (!isAuthorized && authRoutes.some((route) => currentRoute.matchPathname(route.pathname))) {
    return AppRoutes.SignIn;
  }

  if (isAuthorized && nonAuthRoutes.some((route) => currentRoute.matchPathname(route.pathname))) {
    return AppRoutes.Chat;
  }

  return null;
};
