import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { LinkAsButton } from "shared/ui";
import { ProfileFormInfo } from "../../profile-form-info/profile-form-info";
import styles from "./profile-main-subpage.module.scss";

export class ProfileMainSubPage extends Block {
  constructor() {
    super({
      ProfileFormInfo: new ProfileFormInfo({ isReadonly: true }),
      LinkChangeData: new LinkAsButton({
        href: AppRoutes.ProfileEditInfo,
        text: "Изменить данные",
        variant: "white",
        size: "medium",
      }),
      LinkChangePassword: new LinkAsButton({
        href: AppRoutes.ProfileEditPassword,
        text: "Изменить пароль",
        variant: "white",
        size: "medium",
      }),
      LinkSignOut: new LinkAsButton({
        href: AppRoutes.SignIn,
        text: "Выйти",
        variant: "white",
        size: "medium",
      }),
    });
  }

  override render() {
    return /* HTML */ `
      <div class="${styles.subPage}">
        {{{ ProfileFormInfo }}}

        <div>{{{ LinkChangeData }}} {{{ LinkChangePassword }}} {{{ LinkSignOut }}}</div>
      </div>
    `;
  }
}
