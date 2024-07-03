import { Block } from "shared/constructors";
import { ProfileAvatar } from "./profile-avatar/profile-avatar";
import { ProfilePrevious } from "./profile-previous/profile-previous";
import { SubPages } from "./subpages/subpages";
import type { SubPageType } from "./subpages/subpages";
import styles from "./profile-page.module.scss";

type Props = {
  subPage: SubPageType;
};

export class ProfilePage extends Block {
  constructor(props: Props) {
    const { subPage } = props;

    super({
      ProfilePrevious: new ProfilePrevious(),
      ProfileAvatar: new ProfileAvatar(),
      SubPages: new SubPages({ subPage }),
    });
  }

  override render() {
    return /* HTML */ `
      <main class="${styles.main}">
        {{{ ProfilePrevious }}}

        <div class="${styles.contentPositioner}">
          <div class="${styles.content}">{{{ ProfileAvatar }}} {{{ SubPages }}}</div>
        </div>
      </main>
    `;
  }
}
