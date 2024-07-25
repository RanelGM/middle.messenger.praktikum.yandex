import { connect } from "entities/store";
import { Block } from "shared/constructors";
import { isEqual } from "shared/lib";
import { UserSearchItemWithStore } from "./user-search-item";
import type { StoreState } from "entities/store";
import type { User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import type { ApiState } from "shared/types";
import styles from "./users-search-list.module.scss";

type MapProps = {
  searchUsersApi: ApiState<User[] | null>;
};

const mapStateToProps = (state: StoreState): MapProps => {
  return {
    searchUsersApi: state.userReducer.searchUsers,
  };
};

class UsersSearchList extends Block {
  constructor() {
    super({
      isLoading: false,
      lists: [],
    });
  }

  componentDidUpdate(oldProps: BlockProps & MapProps, newProps: BlockProps & MapProps): boolean {
    if (!isEqual(oldProps.searchUsersApi?.data ?? {}, newProps.searchUsersApi?.data ?? {})) {
      const users = newProps.searchUsersApi?.data ?? [];

      this.setLists({ lists: this.getItems(users) });
    }

    if (oldProps.searchUsersApi?.isLoading !== newProps.searchUsersApi?.isLoading) {
      //
    }

    return true;
  }

  getItems(users: User[]) {
    return users.map((user) => new UserSearchItemWithStore({ user }));
  }

  render(): string {
    return /* HTML */ `
      <ul class="${styles.userSearchList}">
        {{{ lists }}}
      </ul>
    `;
  }
}

export const UsersSearchListWithStore = connect(mapStateToProps, UsersSearchList);
