import { ChatPage, ErrorNotFoundPage, ErrorServerPage, ProfilePage, SignInPage, SignUpPage } from "pages";
import { AppRoutes } from "shared/constants";
import type { RegisterRoute } from "shared/constructors";

export const commonRoutes: RegisterRoute[] = [
  { pathname: AppRoutes.ErrorNotFound, page: ErrorNotFoundPage, isFallbackRoute: true },
  { pathname: AppRoutes.ErrorServer, page: ErrorServerPage },
];

export const authRoutes: RegisterRoute[] = [
  { pathname: AppRoutes.Profile, page: ProfilePage, pageProps: { subPage: "main" } },
  { pathname: AppRoutes.ProfileEditInfo, page: ProfilePage, pageProps: { subPage: "edit-info" } },
  { pathname: AppRoutes.ProfileEditPassword, page: ProfilePage, pageProps: { subPage: "edit-password" } },
  { pathname: AppRoutes.Chat, page: ChatPage },
];

export const nonAuthRoutes: RegisterRoute[] = [
  { pathname: AppRoutes.SignIn, page: SignInPage },
  { pathname: AppRoutes.SignUp, page: SignUpPage },
];

export const allRoutes = [...commonRoutes, ...authRoutes, ...nonAuthRoutes];
