import { connect } from "entities/store";
import { userApi } from "entities/user";
import { Block } from "shared/constructors";
import { InputBasic } from "shared/ui";
import type { StoreState } from "entities/store";
import type { User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";
import type { BasicInputEvent } from "shared/ui";
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

const DefaultImageSrc = "/media/profile-avatar.svg";
const resoursesPath = userApi.getResourcesPath();

class ProfileAvatar extends Block {
  constructor(props: InnerProps) {
    const { imageSrc = DefaultImageSrc, userApi } = props;

    super({
      userApi,
      imageSrc,
      firstName: "",
      FileInput: new InputBasic({
        type: "file",
        classNameInput: "visually-hidden",
        accept: "image/jpeg, image/jpg, image/png, image/gif, image/webp",
        onChange: (evt) => {
          this.handleInputChange(evt);
        },
      }),
    });
  }

  private handleInputChange(evt: BasicInputEvent<Event>) {
    const [file] = evt.target.files ?? [];

    if (file) {
      const formData = new FormData();
      formData.append("avatar", file);

      void userApi.changeAvatar(formData);
    }
  }

  componentDidUpdate(oldProps: BlockProps & InnerProps, newProps: BlockProps & InnerProps): boolean {
    if (oldProps.userApi?.data?.avatar !== newProps.userApi?.data?.avatar) {
      const avatarSrc = newProps.userApi?.data?.avatar;

      this.setProps({ imageSrc: avatarSrc ? `${resoursesPath}${avatarSrc}` : DefaultImageSrc });
    }

    if (oldProps.userApi?.data?.firstName !== newProps.userApi?.data?.firstName) {
      this.setProps({ firstName: newProps.userApi?.data?.firstName ?? "" });
    }

    return true;
  }

  override render() {
    return /* HTML */ `
      <div class="${styles.profileAvatar}">
        <label class="${styles.imageWrapper}">
          <img class="${styles.image}" src="{{ imageSrc }}" alt="Аватар пользователя" width="130" height="130" />
          <p class="${styles.changeOverlay}">Поменять аватар</p>
          {{{ FileInput }}}
        </label>

        <h2 class="${styles.name}">{{ firstName }}</h2>
      </div>
    `;
  }
}

export const ProfileAvatarWithStore = connect(mapStateToProps, ProfileAvatar);
