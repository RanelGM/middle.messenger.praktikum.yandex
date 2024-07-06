import { AppRoutes } from "shared/constants";
import { typedObjectKeys } from "shared/lib";
import { Header } from "shared/ui";
import { ChatPage, ErrorNotFoundPage, ErrorServerPage, ProfilePage, SignInPage, SignUpPage } from "./pages";
import "./assets/styles/index.scss";

const routes = {
  [AppRoutes.SignIn]: () => new SignInPage(),
  [AppRoutes.SignUp]: () => new SignUpPage(),
  [AppRoutes.Profile]: () => new ProfilePage({ subPage: "main" }),
  [AppRoutes.ProfileEditInfo]: () => new ProfilePage({ subPage: "edit-info" }),
  [AppRoutes.ProfileEditPassword]: () => new ProfilePage({ subPage: "edit-password" }),
  [AppRoutes.Chat]: () => new ChatPage(),
  [AppRoutes.ErrorNotFound]: () => new ErrorNotFoundPage(),
  [AppRoutes.ErrorServer]: () => new ErrorServerPage(),
} as const;

const navigateTo = (page: string | undefined) => {
  const key = page && page in routes ? (page as keyof typeof routes) : AppRoutes.ErrorNotFound;
  const preparePage = routes[key];

  const container = document.querySelector("#app");
  const header = new Header().getContent();
  const content = preparePage().getContent();

  if (container && header && content) {
    container.innerHTML = "";
    container.append(header);
    container.append(content);
  }
};

/* В момент первой загрузки страницы - перейти на нужную в зависимости от url (или на страницу 404, если url некорректный) */
document.addEventListener("DOMContentLoaded", () => {
  const pathname = window.location.pathname;

  if (pathname === "/") {
    navigateTo(AppRoutes.SignIn);

    return;
  }

  const route = typedObjectKeys(routes).find((item) => pathname.includes(item));

  navigateTo(route);
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
