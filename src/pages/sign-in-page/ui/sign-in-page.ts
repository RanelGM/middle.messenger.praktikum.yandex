import { connect } from "entities/store";
import { userApi } from "entities/user";
import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { validateLogin, validatePassword } from "shared/lib";
import { Form, LinkAsButton, PageTitle } from "shared/ui";
import type { StoreState } from "entities/store/model/types";
import type { SignIn, User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";
import styles from "./sign-in-page.module.scss";

type MapProps = {
  userApi: ApiState<User | null>;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    userApi: state.userReducer.user,
  };
};
class SignInPage extends Block {
  constructor() {
    super({
      PageTitle: new PageTitle({ text: "Вход", className: styles.title }),
      Form: new Form<SignIn>({
        inputs: [
          { labelText: "Логин", name: "login", type: "text", validate: validateLogin },
          { labelText: "Пароль", name: "password", type: "password", validate: validatePassword },
        ],
        submitText: "Войти",
        onSubmit: (submitData) => {
          void userApi.signIn(submitData);
        },
      }),
      SignUp: new LinkAsButton({
        href: AppRoutes.SignUp,
        text: "Зарегистрироваться",
        variant: "white",
      }),
    });
  }

  componentDidUpdate(oldProps: BlockProps & Partial<MapProps>, newProps: BlockProps & Partial<MapProps>): boolean {
    if (newProps.userApi && oldProps.userApi?.isLoading !== newProps.userApi.isLoading) {
      const isLoading = newProps.userApi.isLoading;

      this.children.SignUp?.setProps({ isLoading });
      this.children.Form?.setProps({ isLoading });
    }

    return true;
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        <div class="${styles.content}">{{{ PageTitle }}} {{{ Form }}} {{{ SignUp }}}</div>
      </main>
    `;
  }
}

export const SignInPageWithStore = connect(mapStateToProps, SignInPage);
