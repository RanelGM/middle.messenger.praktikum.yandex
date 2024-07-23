import { authApi } from "entities/auth";
import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { Button, LinkAsButton } from "shared/ui";
import { ProfileFormInfoWithStore } from "../../profile-form-info/profile-form-info";
import styles from "./profile-main-subpage.module.scss";

export class ProfileMainSubPage extends Block {
  constructor() {
    super({
      ProfileFormInfo: new ProfileFormInfoWithStore({ isReadonly: true }),
      ChangeData: new LinkAsButton({
        href: AppRoutes.ProfileEditInfo,
        text: "Изменить данные",
        variant: "white",
        size: "medium",
      }),
      ChangePassword: new LinkAsButton({
        href: AppRoutes.ProfileEditPassword,
        text: "Изменить пароль",
        variant: "white",
        size: "medium",
      }),
      SignOut: new Button({
        text: "Выйти",
        variant: "white",
        size: "medium",
        onClick: () => {
          void authApi.logout();
        },
      }),
    });
  }

  override render() {
    return /* HTML */ `
      <div class="${styles.subPage}">
        {{{ ProfileFormInfo }}}

        <div class="${styles.controls}">{{{ ChangeData }}} {{{ ChangePassword }}} {{{ SignOut }}}</div>
      </div>
    `;
  }
}
