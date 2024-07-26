import { connect } from "entities/store";
import { userApi } from "entities/user";
import { Block } from "shared/constructors";
import { getImageSrc } from "shared/lib";
import { ImageInput } from "shared/ui";
import type { StoreState } from "entities/store";
import type { User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";
import styles from "./profile-avatar.module.scss";

type MapProps = {
  userApi: ApiState<User | null>;
};

type InnerProps = MapProps & {
  imageSrc: string;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    userApi: state.userReducer.user,
  };
};

class ProfileAvatar extends Block {
  constructor(props: InnerProps) {
    const { imageSrc = getImageSrc(null), userApi } = props;

    super({
      userApi,
      imageSrc,
      firstName: "",
      ImageInput: new ImageInput({
        imageSrc: "",
        onChange: (file) => {
          this.handleInputChange(file);
        },
      }),
    });
  }

  private handleInputChange(file: File) {
    const formData = new FormData();
    formData.append("avatar", file);

    void userApi.changeAvatar(formData);
  }

  componentDidUpdate(oldProps: BlockProps & InnerProps, newProps: BlockProps & InnerProps): boolean {
    if (oldProps.userApi?.data?.avatar !== newProps.userApi?.data?.avatar) {
      this.children.ImageInput?.setProps({
        imageSrc: getImageSrc(newProps.userApi?.data?.avatar),
      });
    }

    if (oldProps.userApi?.data?.firstName !== newProps.userApi?.data?.firstName) {
      this.setProps({ firstName: newProps.userApi?.data?.firstName ?? "" });
    }

    return true;
  }

  override render() {
    return /* HTML */ `
      <div class="${styles.profileAvatar}">
        {{{ ImageInput }}}

        <h2 class="${styles.name}">{{ firstName }}</h2>
      </div>
    `;
  }
}

export const ProfileAvatarWithStore = connect(mapStateToProps, ProfileAvatar);
