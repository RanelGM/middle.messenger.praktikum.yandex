import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { LinkAsButton } from "shared/ui";
import { ProfileFormInfo } from "../../profile-form-info/profile-form-info";
import styles from "./profile-edit-info-subpage.module.scss";

export class ProfileEditInfoSubPage extends Block {
  constructor() {
    super({
      ProfileFormInfo: new ProfileFormInfo({}),
      LinkAsButton: new LinkAsButton({
        href: AppRoutes.Profile,
        page: AppRoutes.Profile,
        text: "Сохранить",
        variant: "blue",
        size: "medium",
      }),
    });
  }

  override render() {
    return /* HTML */ `<div class="${styles.subPage}">{{{ ProfileFormInfo }}} {{{ LinkAsButton }}}</div>`;
  }
}
