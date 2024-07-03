import { Block } from "shared/constructors";
import { Icon, LinkAsButton } from "shared/ui";
import styles from "./profile-previous.module.scss";

export class ProfilePrevious extends Block {
  constructor() {
    super({
      LinkAsButton: new LinkAsButton({
        href: "/chat",
        variant: "transparent",
        page: "chat",
        Icon: new Icon({ name: "ArrowCircle", className: styles.icon }),
      }),
    });
  }

  override render() {
    return /* HTML */ `<div class="${styles.profilePrevious}">{{{ LinkAsButton }}}</div>`;
  }
}
