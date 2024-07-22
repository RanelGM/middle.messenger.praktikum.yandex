import { authApi } from "entities/auth";
import { connect } from "entities/store";
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
import { Form, LinkAsButton, PageTitle } from "shared/ui";
import type { SignUp, User } from "entities/auth";
import type { StoreState } from "entities/store/model/types";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";
import styles from "./sign-up-page.module.scss";

type MapProps = {
  userApi: ApiState<User | null>;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    userApi: state.authReducer.user,
  };
};

class SignUpPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Регистрация", className: styles.title }),
      Form: new Form<SignUp>({
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
        isLoading: false,
        onSubmit: (submitData) => {
          void authApi.signUp(submitData);
        },
      }),
      SignIn: new LinkAsButton({
        href: AppRoutes.SignIn,
        text: "Войти",
        variant: "white",
        isLoading: false,
      }),
    });
  }

  componentDidUpdate(oldProps: BlockProps & Partial<MapProps>, newProps: BlockProps & Partial<MapProps>): boolean {
    if (newProps.userApi && oldProps.userApi?.isLoading !== newProps.userApi.isLoading) {
      const isLoading = newProps.userApi.isLoading;

      this.children.SignIn?.setProps({ isLoading });
      this.children.Form?.setProps({ isLoading });
    }

    return true;
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">{{{ PageTitle }}} {{{ Form }}} {{{ SignIn }}}</div>
      </main>
    `;
  }
}

export const SignUpPageWithStore = connect(mapStateToProps, SignUpPage);
