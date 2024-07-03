import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { Input, LinkAsButton, PageTitle } from "shared/ui";
import styles from "./sign-up-page.module.scss";

export class SignUpPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Регистрация", className: styles.title }),
      InputEmail: new Input({ labelText: "Почта", name: "email", type: "email" }),
      InputLogin: new Input({ labelText: "Логин", name: "login", type: "text" }),
      InputFirstName: new Input({ labelText: "Имя", name: "first_name", type: "text" }),
      InputSecondName: new Input({ labelText: "Фамилия", name: "second_name", type: "text" }),
      InputPhone: new Input({ labelText: "Телефон", name: "phone", type: "tel" }),
      InputPassword: new Input({ labelText: "Пароль", name: "password", type: "password" }),
      InputPasswordRepeat: new Input({ labelText: "Пароль (ещё раз)", name: "password-repeat", type: "password" }),
      SignUp: new LinkAsButton({
        href: AppRoutes.Profile,
        page: AppRoutes.Profile,
        text: "Зарегистрироваться",
        variant: "blue",
      }),
      SignIn: new LinkAsButton({
        href: AppRoutes.SignIn,
        page: AppRoutes.SignIn,
        text: "Войти",
        variant: "white",
      }),
    });
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">
          {{{ PageTitle }}}

          <form class="${styles.form}">
            {{{ InputEmail }}} {{{ InputLogin }}} {{{ InputFirstName }}} {{{ InputSecondName }}} {{{ InputPhone }}} {{{
            InputPassword }}} {{{ InputPasswordRepeat }}}
          </form>

          <div class="${styles.buttons}">{{{ SignUp }}} {{{ SignIn }}}</div>
        </div>
      </main>
    `;
  }
}
