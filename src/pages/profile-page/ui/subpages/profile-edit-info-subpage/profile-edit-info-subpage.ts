import { Block } from "shared/constructors";
import { ProfileFormInfo } from "../../profile-form-info/profile-form-info";

export class ProfileEditInfoSubPage extends Block {
  constructor() {
    super({
      Form: new ProfileFormInfo({}),
    });
  }

  override render() {
    return /* HTML */ `{{{ Form }}}`;
  }
}
