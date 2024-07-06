import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { Form } from "shared/ui";
import { validateLogin, validatePassword } from "shared/lib";
import { LinkAsButton, PageTitle } from "shared/ui";
import styles from "./sign-in-page.module.scss";

export class SignInPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Вход", className: styles.title }),
      Form: new Form({
        inputs: [
          { labelText: "Логин", name: "login", type: "text", validate: validateLogin },
          { labelText: "Пароль", name: "password", type: "password", validate: validatePassword },
        ],
        submitText: "Войти",
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
        <div class="${styles.content}">{{{ PageTitle }}} {{{ Form }}} {{{ SignUp }}}</div>
      </main>
    `;
  }
}
