import { Block } from "shared/constructors";
import { LinkAsButton } from "shared/ui";
import { ProfileInput } from "../../profile-input/profile-input";
import styles from "./profile-edit-password-subpage.module.scss";

export class ProfileEditPasswordSubPage extends Block {
  constructor() {
    super({
      InputOldPassword: new ProfileInput({
        labelText: "Старый пароль",
        name: "oldPassword",
        type: "password",
        value: "foobar",
      }),
      InputNewPassword: new ProfileInput({
        labelText: "Новый пароль",
        name: "newPassword",
        type: "password",
        value: "foobarbaz",
      }),
      InputRepeatPassword: new ProfileInput({
        labelText: "Повторите новый пароль",
        name: "newPasswordConfirm",
        type: "password",
        value: "foobarbaz",
      }),
      LinkAsButton: new LinkAsButton({
        text: "Сохранить",
        variant: "blue",
        size: "medium",
        page: "profile",
      }),
    });
  }

  override render() {
    return /* HTML */ `
      <div class="${styles.subPage}">
        <div>{{{ InputOldPassword }}} {{{ InputNewPassword }}} {{{ InputRepeatPassword }}}</div>

        {{{ LinkAsButton }}}
      </div>
    `;
  }
}
