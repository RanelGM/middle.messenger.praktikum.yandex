import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { validateLogin, validatePassword } from "shared/lib";
import { Button, Input, LinkAsButton, PageTitle } from "shared/ui";
import type { ValueOf } from "shared/types";
import type { BasicInputEvent } from "shared/ui";
import styles from "./sign-in-page.module.scss";

const InputNames = {
  Login: "login",
  Password: "password",
} as const;

const InputValidation = {
  [InputNames.Login]: validateLogin,
  [InputNames.Password]: validatePassword,
} as const;

export class SignInPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Вход", className: styles.title }),
      [InputNames.Login]: new Input({
        labelText: "Логин",
        name: InputNames.Login,
        type: "text",
        onBlur: (evt) => {
          this._handleInputBlur(evt, InputNames.Login);
        },
      }),
      [InputNames.Password]: new Input({
        labelText: "Пароль",
        name: InputNames.Password,
        type: "password",
        onBlur: (evt) => {
          this._handleInputBlur(evt, InputNames.Password);
        },
      }),
      SignIn: new Button({
        text: "Войти",
        variant: "blue",
        onClick: () => {
          this._handleSubmitButtonClick();
        },
      }),
      SignUp: new LinkAsButton({
        href: AppRoutes.SignUp,
        page: AppRoutes.SignUp,
        text: "Зарегистрироваться",
        variant: "white",
      }),
    });
  }

  _validate(inputName: ValueOf<typeof InputNames>, value: string) {
    const validate = InputValidation[inputName];
    const { isValid, errorMessage } = validate(value);

    if (this.children[inputName]) {
      (this.children[inputName] as Block).props.errorMessage = errorMessage;
    }

    return isValid;
  }

  _handleInputBlur(evt: BasicInputEvent<FocusEvent>, inputName: ValueOf<typeof InputNames>) {
    this.setProps({ [inputName]: evt.target.value });
    this._validate(inputName, evt.target.value);
  }

  _handleSubmitButtonClick() {
    let isFormValid = true;
    const formValues = {} as Record<ValueOf<typeof InputNames>, string>;

    Object.values(InputNames).forEach((inputName) => {
      const value = (this.props[inputName] as string | undefined) ?? "";
      const isValid = this._validate(inputName, value);

      formValues[inputName] = value;

      if (!isValid) {
        isFormValid = false;
      }
    });

    const validationMessage = `Форма ${(isFormValid as boolean) ? "прошла" : "не прошла"} валидацию`;

    console.group("Форма");
    console.log(validationMessage);
    console.log(`Текущие данные:`, formValues);
    console.groupEnd();

    // eslint-disable-next-line no-alert
    alert(`${validationMessage} ${JSON.stringify(formValues, null, 2)}`);
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">
          {{{ PageTitle }}}

          <form class="${styles.form}">{{{ ${InputNames.Login} }}} {{{ ${InputNames.Password} }}}</form>

          <div class="${styles.buttons}">{{{ SignIn }}} {{{ SignUp }}}</div>
        </div>
      </main>
    `;
  }
}
