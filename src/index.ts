import Handlebars from "handlebars";
import { AppRoutes } from "shared/constants";
import * as SharedUI from "shared/ui";
import { ChatPage, ErrorNotFoundPage, ErrorServerPage, ProfilePage, SignInPage, SignUpPage } from "./pages";
import "./assets/styles/index.scss";

const routes = {
  [AppRoutes.SignIn]: [SignInPage],
  [AppRoutes.SignUp]: [SignUpPage],
  [AppRoutes.Profile]: [ProfilePage, { isMainSubPage: true }],
  [AppRoutes.ProfileEditInfo]: [ProfilePage, { isEditInfoSubPage: true }],
  [AppRoutes.ProfileEditPassword]: [ProfilePage, { isEditPasswordSubPage: true }],
  [AppRoutes.Chat]: [ChatPage],
  [AppRoutes.ErrorNotFound]: [ErrorNotFoundPage],
  [AppRoutes.ErrorServer]: [ErrorServerPage],
};

Object.entries(SharedUI).forEach(([name, component]) => {
  Handlebars.registerPartial(name, component);
});

const navigateTo = (page: keyof typeof routes) => {
  const route = routes[page];

  if (route) {
    const [source, args] = route;
    const renderHeader = Handlebars.compile(SharedUI.Header);
    const renderContent = Handlebars.compile(source);

    document.body.innerHTML = renderHeader("") + renderContent(args);
  }
};

/* В момент первой загрузки страницы - перейти на нужную в зависимости от url (или на страницу 404, если url некорректный) */
document.addEventListener("DOMContentLoaded", () => {
  const pathname = window.location.pathname;

  if (pathname === "/") {
    navigateTo(AppRoutes.SignIn);

    return;
  }

  const route = Object.keys(routes).find((item) => pathname.includes(item));

  navigateTo(route ?? AppRoutes.ErrorNotFound);
});

/* При клике на ссылки - перейти на нужную страницу */
document.addEventListener("click", (evt: Event) => {
  const page = (evt.target as HTMLElement).getAttribute("page");

  if (page) {
    navigateTo(page);

    evt.preventDefault();
    evt.stopImmediatePropagation();
  }
});
