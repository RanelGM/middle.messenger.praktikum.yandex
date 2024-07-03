import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { Input, LinkAsButton, PageTitle } from "shared/ui";
import styles from "./sign-in-page.module.scss";

export class SignInPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Вход", className: styles.title }),
      InputLogin: new Input({ labelText: "Логин", name: "login", type: "text" }),
      InputPassword: new Input({ labelText: "Пароль", name: "password", type: "password" }),
      SignIn: new LinkAsButton({
        href: AppRoutes.Profile,
        page: AppRoutes.Profile,
        text: "Войти",
        variant: "blue",
      }),
      SignUp: new LinkAsButton({
        href: AppRoutes.SignUp,
        page: AppRoutes.SignUp,
        text: "Зарегистрироваться",
        variant: "white",
      }),
    });
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">
          {{{ PageTitle }}}

          <form class="${styles.form}">{{{ InputLogin }}} {{{ InputPassword }}}</form>

          <div class="${styles.buttons}">{{{ SignIn }}} {{{ SignUp }}}</div>
        </div>
      </main>
    `;
  }
}
