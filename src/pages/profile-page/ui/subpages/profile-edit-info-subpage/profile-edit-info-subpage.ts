import { Block } from "shared/constructors";
import { LinkAsButton } from "shared/ui";
import { ProfileFormInfo } from "../../profile-form-info/profile-form-info";
import styles from "./profile-edit-info-subpage.module.scss";

export class ProfileEditInfoSubPage extends Block {
  constructor() {
    super({
      ProfileFormInfo: new ProfileFormInfo({}),
      LinkAsButton: new LinkAsButton({
        text: "Сохранить",
        href: "/profile",
        variant: "blue",
        size: "medium",
        page: "profile",
      }),
    });
  }

  override render() {
    return /* HTML */ `<div class="${styles.subPage}">{{{ ProfileFormInfo }}} {{{ LinkAsButton }}}</div>`;
  }
}
