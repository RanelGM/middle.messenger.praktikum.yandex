import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { Form } from "shared/ui";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePasswordRepeat,
  validatePhone,
} from "shared/lib";
import { LinkAsButton, PageTitle } from "shared/ui";
import styles from "./sign-up-page.module.scss";

export class SignUpPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Регистрация", className: styles.title }),
      Form: new Form({
        inputs: [
          { labelText: "Почта", name: "email", type: "email", validate: validateEmail },
          { labelText: "Логин", name: "login", type: "text", validate: validateLogin },
          { labelText: "Имя", name: "first_name", type: "text", validate: validateName },
          { labelText: "Фамилия", name: "second_name", type: "text", validate: validateName },
          { labelText: "Телефон", name: "phone", type: "tel", validate: validatePhone },
          {
            labelText: "Пароль",
            name: "password",
            type: "password",
            repeatByName: "password-repeat",
            validate: validatePassword,
          },
          {
            labelText: "Пароль (ещё раз)",
            name: "password-repeat",
            type: "password",
            repeatForName: "password",
            validate: validatePasswordRepeat,
          },
        ],
        submitText: "Зарегистрироваться",
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
        <div class="${styles.content}">{{{ PageTitle }}} {{{ Form }}} {{{ SignIn }}}</div>
      </main>
    `;
  }
}
