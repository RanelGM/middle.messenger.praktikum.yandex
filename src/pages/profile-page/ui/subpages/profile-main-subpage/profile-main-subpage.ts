import { Block } from "shared/constructors";
import { LinkAsButton } from "shared/ui";
import { ProfileFormInfo } from "../../profile-form-info/profile-form-info";
import styles from "./profile-main-subpage.module.scss";

export class ProfileMainSubPage extends Block {
  constructor() {
    super({
      ProfileFormInfo: new ProfileFormInfo({ isReadonly: true }),
      LinkChangeData: new LinkAsButton({
        text: "Изменить данные",
        variant: "white",
        size: "medium",
        page: "profile/edit-info",
      }),
      LinkChangePassword: new LinkAsButton({
        text: "Изменить пароль",
        variant: "white",
        size: "medium",
        page: "profile/edit-password",
      }),
      LinkSignOut: new LinkAsButton({ text: "Выйти", variant: "white", size: "medium", page: "signin" }),
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
