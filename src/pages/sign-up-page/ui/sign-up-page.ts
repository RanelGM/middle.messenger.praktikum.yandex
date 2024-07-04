import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import {
  validateEmail,
  validateLogin,
  validateName,
  validatePassword,
  validatePasswordRepeat,
  validatePhone,
} from "shared/lib";
import { Button, Input, LinkAsButton, PageTitle } from "shared/ui";
import type { ValueOf } from "shared/types";
import type { BasicInputEvent } from "shared/ui";
import styles from "./sign-up-page.module.scss";

const InputNames = {
  Email: "email",
  Login: "login",
  FirstName: "first_name",
  SecondName: "second_name",
  Phone: "phone",
  Password: "password",
  PasswordRepeat: "password-repeat",
} as const;

const InputValidation = {
  [InputNames.Email]: validateEmail,
  [InputNames.Login]: validateLogin,
  [InputNames.FirstName]: validateName,
  [InputNames.SecondName]: validateName,
  [InputNames.Phone]: validatePhone,
  [InputNames.Password]: validatePassword,
  [InputNames.PasswordRepeat]: validatePasswordRepeat,
} as const;

export class SignUpPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Регистрация", className: styles.title }),
      [InputNames.Email]: new Input({
        labelText: "Почта",
        name: InputNames.Email,
        type: "email",
        onBlur: (evt) => {
          this._handleInputBlur(evt, InputNames.Email);
        },
      }),
      [InputNames.Login]: new Input({
        labelText: "Логин",
        name: InputNames.Login,
        type: "text",
        onBlur: (evt) => {
          this._handleInputBlur(evt, InputNames.Login);
        },
      }),
      [InputNames.FirstName]: new Input({
        labelText: "Имя",
        name: InputNames.FirstName,
        type: "text",
        onBlur: (evt) => {
          this._handleInputBlur(evt, InputNames.FirstName);
        },
      }),
      [InputNames.SecondName]: new Input({
        labelText: "Фамилия",
        name: InputNames.SecondName,
        type: "text",
        onBlur: (evt) => {
          this._handleInputBlur(evt, InputNames.SecondName);
        },
      }),
      [InputNames.Phone]: new Input({
        labelText: "Телефон",
        name: InputNames.Phone,
        type: "tel",
        onBlur: (evt) => {
          this._handleInputBlur(evt, InputNames.Phone);
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
      [InputNames.PasswordRepeat]: new Input({
        labelText: "Пароль (ещё раз)",
        name: InputNames.PasswordRepeat,
        type: "password",
        onBlur: (evt) => {
          this._handleInputBlur(evt, InputNames.PasswordRepeat);
        },
      }),
      SignUp: new Button({
        text: "Зарегистрироваться",
        variant: "blue",
        onClick: () => {
          this._handleSubmitButtonClick();
        },
      }),
      SignIn: new LinkAsButton({
        href: AppRoutes.SignIn,
        page: AppRoutes.SignIn,
        text: "Войти",
        variant: "white",
      }),
    });
  }

  _validate(inputName: ValueOf<typeof InputNames>, value: string) {
    if (inputName === InputNames.Password || inputName === InputNames.PasswordRepeat) {
      const currentValue =
        inputName === InputNames.Password ? value : (this.props[InputNames.Password] as string | undefined);
      const repeatValue =
        inputName === InputNames.PasswordRepeat ? value : (this.props[InputNames.PasswordRepeat] as string | undefined);

      return this._validatePassword(currentValue ?? "", repeatValue ?? "");
    }

    const validate = InputValidation[inputName];
    const { isValid, errorMessage } = validate(value);

    if (this.children[inputName]) {
      (this.children[inputName] as Block).props.errorMessage = errorMessage;
    }

    return isValid;
  }

  _validatePassword(current: string, repeat: string) {
    const currentValidity = validatePassword(current);
    const repeatValidity = validatePasswordRepeat(current, repeat);

    if (this.children[InputNames.Password]) {
      (this.children[InputNames.Password] as Block).props.errorMessage = currentValidity.errorMessage;
    }

    if (this.children[InputNames.PasswordRepeat]) {
      (this.children[InputNames.PasswordRepeat] as Block).props.errorMessage = repeatValidity.errorMessage;
    }

    return currentValidity.isValid && repeatValidity.isValid;
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

          <form class="${styles.form}">
            {{{ ${InputNames.Email} }}} {{{ ${InputNames.Login} }}} {{{ ${InputNames.FirstName} }}} {{{
            ${InputNames.SecondName} }}} {{{ ${InputNames.Phone} }}} {{{ ${InputNames.Password} }}} {{{
            ${InputNames.PasswordRepeat} }}}
          </form>

          <div class="${styles.buttons}">{{{ SignUp }}} {{{ SignIn }}}</div>
        </div>
      </main>
    `;
  }
}
