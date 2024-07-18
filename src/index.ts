import { AppRoutes } from "shared/constants";
import { router } from "shared/constructors";
import { ChatPage, ErrorNotFoundPage, ErrorServerPage, ProfilePage, SignInPage, SignUpPage } from "./pages";
import type { RegisterRoute } from "shared/constructors";
import "./assets/styles/index.scss";

const appRoutes: RegisterRoute[] = [
  { pathname: AppRoutes.SignIn, page: SignInPage },
  { pathname: AppRoutes.SignUp, page: SignUpPage },
  { pathname: AppRoutes.Profile, page: ProfilePage, pageProps: { subPage: "main" } },
  { pathname: AppRoutes.ProfileEditInfo, page: ProfilePage, pageProps: { subPage: "edit-info" } },
  { pathname: AppRoutes.ProfileEditPassword, page: ProfilePage, pageProps: { subPage: "edit-password" } },
  { pathname: AppRoutes.Chat, page: ChatPage },
  { pathname: AppRoutes.ErrorNotFound, page: ErrorNotFoundPage, isFallbackRoute: true },
  { pathname: AppRoutes.ErrorServer, page: ErrorServerPage },
];

appRoutes.forEach((appRoute) => {
  router.use(appRoute);
});

router.start();
