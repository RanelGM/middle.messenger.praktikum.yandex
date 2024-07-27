import { AppRoutes } from "shared/constants";
import { Block } from "shared/constructors";
import { Icon, Link } from "shared/ui";
import styles from "./profile-link.module.scss";

export class ProfileLink extends Block {
  constructor() {
    super({
      Link: new Link({
        text: "Профиль",
        href: AppRoutes.Profile,
        className: styles.profileLink,
        IconRight: new Icon({ name: "ArrowTick", size: "extra-small", className: styles.icon }),
      }),
    });
  }

  render() {
    return /* HTML */ `{{{ Link }}}`;
  }
}
