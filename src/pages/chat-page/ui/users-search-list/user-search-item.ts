import { connect, store } from "entities/store";
import { Block } from "shared/constructors";
import { getImageSrc, isEqual } from "shared/lib";
import type { StoreState } from "entities/store";
import type { User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import styles from "./users-search-list.module.scss";

type Props = {
  user: User;
};

type MapProps = {
  checkedUsers: Record<string, User>;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    checkedUsers: state.userReducer.checkedUsers,
  };
};

class UserSearchItem extends Block {
  constructor(props: Props) {
    const { user } = props;
    const { firstName, secondName, login, avatar } = user;

    super({
      isActive: false,
      user,
      login,
      name: `${firstName ?? ""} ${secondName ?? ""}`,
      imageSrc: getImageSrc(avatar),
      events: {
        click: () => {
          this.handleClick(user);
        },
      },
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps & Props, newProps: BlockProps & MapProps & Props): boolean {
    if (!isEqual(oldProps.checkedUsers ?? {}, newProps.checkedUsers ?? {})) {
      const isActive = Boolean(newProps.checkedUsers[newProps.user.id]);

      this.setProps({ isActive });
    }

    return true;
  }

  private handleClick(user: User) {
    store.dispatch({ type: "TOGGLE_CHECKED_USERS", payload: user });
  }

  render(): string {
    return /* HTML */ `
      <li class="${styles.userSearchItem} {{#if isActive}}${styles.userSearchItem_active}{{/if}}">
        <img class="${styles.image}" src="{{ imageSrc }}" alt="Аватар пользователя" width="130" height="130" />

        <div class="${styles.namesWrapper}">
          <h3>{{ login }}</h3>
          <p>{{ name }}</p>
        </div>
      </li>
    `;
  }
}

export const UserSearchItemWithStore = connect(mapStateToProps, UserSearchItem);
