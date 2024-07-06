import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { Icon } from "shared/ui";
import styles from "./profile-link.module.scss";

export class ProfileLink extends Block {
  constructor() {
    super({
      Icon: new Icon({ name: "ArrowTick", size: "extra-small", className: styles.icon }),
    });
  }

  render() {
    return /* HTML */ `<a class="${styles.profileLink}" page="${AppRoutes.Profile}">Профиль {{{ Icon }}}</a>`;
  }
}
