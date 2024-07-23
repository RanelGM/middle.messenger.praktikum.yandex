import { Block } from "shared/constructors";
import { ProfileEditInfoSubPage } from "./profile-edit-info-subpage/profile-edit-info-subpage";
import { ProfileEditPasswordSubPageWithStore } from "./profile-edit-password-subpage/profile-edit-password-subpage";
import { ProfileMainSubPage } from "./profile-main-subpage/profile-main-subpage";

export type SubPageType = "main" | "edit-info" | "edit-password";

type Props = {
  subPage: SubPageType;
};

const SubPageMap = {
  main: ProfileMainSubPage,
  "edit-info": ProfileEditInfoSubPage,
  "edit-password": ProfileEditPasswordSubPageWithStore,
} as const;

export class SubPages extends Block {
  constructor(props: Props) {
    const { subPage } = props;
    const SubPage = SubPageMap[subPage];

    super({
      SubPage: new SubPage(),
    });
  }

  override render() {
    return /* HTML */ `SubPage {{{ SubPage }}}`;
  }
}
