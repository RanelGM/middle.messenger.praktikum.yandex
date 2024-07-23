import { connect } from "entities/store";
import { userApi } from "entities/user";
import { AppRoutes } from "shared/constants";
import { Block, router } from "shared/constructors";
import { cn, validatePassword, validatePasswordRepeat } from "shared/lib";
import { Button, Form } from "shared/ui";
import type { StoreState } from "entities/store";
import type { PasswordUpdate } from "entities/user";
import type { BlockProps } from "shared/constructors";
import styles from "./profile-edit-password-subpage.module.scss";
import inputStyles from "../../profile-page.module.scss";

const inputsClassNames = {
  classNameWrapper: inputStyles.inputWrapper,
  classNameLabel: inputStyles.inputLabel,
  classNameLabelText: inputStyles.inputLabelText,
  classNameInput: cn(inputStyles.input, "text-dots"),
};

type SubmitState = PasswordUpdate & {
  newPasswordConfirm: string;
};

type MapProps = {
  isLoading: boolean;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    isLoading: state.userReducer.user.isLoading,
  };
};

class ProfileEditPasswordSubPage extends Block {
  constructor(props: MapProps) {
    super({
      ...props,
      Form: new Form<SubmitState>({
        inputs: [
          {
            labelText: "Старый пароль",
            name: "oldPassword",
            type: "password",
            value: "",
            ...inputsClassNames,
            validate: validatePassword,
          },
          {
            labelText: "Новый пароль",
            name: "newPassword",
            type: "password",
            value: "",
            ...inputsClassNames,
            validate: validatePassword,
            repeatForName: "newPasswordConfirm",
          },
          {
            labelText: "Повторите новый пароль",
            name: "newPasswordConfirm",
            type: "password",
            value: "",
            ...inputsClassNames,
            validate: validatePasswordRepeat,
            repeatForName: "newPassword",
          },
        ],
        submitText: "Сохранить",
        onSubmit: (submitData) => {
          this.handleSubmit(submitData);
        },
      }),
      CancelButton: new Button({
        text: "Отмена",
        variant: "white",
        onClick: () => {
          this.redirect();
        },
      }),
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (oldProps.isLoading !== newProps.isLoading) {
      this.children.Form?.setProps({ isLoading: newProps.isLoading });
    }

    return true;
  }

  private handleSubmit(submitData: SubmitState) {
    const { oldPassword, newPassword } = submitData;

    void userApi.changePassword({ oldPassword, newPassword }, this.redirect.bind(this));
  }

  private redirect() {
    router.go(AppRoutes.Profile);
  }

  override render() {
    return /* HTML */ ` <div class="${styles.component}">{{{ Form }}} {{{ CancelButton }}}</div> `;
  }
}

export const ProfileEditPasswordSubPageWithStore = connect(mapStateToProps, ProfileEditPasswordSubPage);
