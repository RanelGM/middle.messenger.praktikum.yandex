import { Block } from "shared/constructors";
import { ProfileFormInfoWithStore } from "../../profile-form-info/profile-form-info";

export class ProfileEditInfoSubPage extends Block {
  constructor() {
    super({
      Form: new ProfileFormInfoWithStore({}),
    });
  }

  override render() {
    return /* HTML */ `{{{ Form }}}`;
  }
}
