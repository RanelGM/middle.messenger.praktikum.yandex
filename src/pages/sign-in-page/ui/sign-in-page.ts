import { Block } from "shared/constructors";
import { Input, LinkAsButton, PageTitle } from "shared/ui";
import styles from "./sign-in-page.module.scss";

export class SignInPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Вход", className: styles.title }),
      InputLogin: new Input({ labelText: "Логин", name: "login", type: "text" }),
      InputPassword: new Input({ labelText: "Пароль", name: "password", type: "password" }),
      LinkSignIn: new LinkAsButton({ text: "Войти", href: "/signin", variant: "blue", page: "signin" }),
      LinkSignUp: new LinkAsButton({ text: "Зарегистрироваться", href: "/signup", variant: "white", page: "signup" }),
    });
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">
          {{{ PageTitle }}}

          <form class="${styles.form}">{{{ InputLogin }}} {{{ InputPassword }}}</form>

          <div class="${styles.buttons}">{{{ LinkSignIn }}} {{{ LinkSignUp }}}</div>
        </div>
      </main>
    `;
  }
}
