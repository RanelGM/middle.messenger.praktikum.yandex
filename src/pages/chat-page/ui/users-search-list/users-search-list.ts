import { Block } from "shared/constructors";
import { isEqual } from "shared/lib";
import { UserSearchItemWithStore } from "./user-search-item";
import type { ChatUser, User } from "entities/user";
import type { BlockProps } from "shared/constructors";
import styles from "./users-search-list.module.scss";

type UsersSearchListProps = {
  users: User[] | ChatUser[];
};

export class UsersSearchList extends Block {
  getItems: (users: User[] | ChatUser[]) => Block[];

  constructor(props: UsersSearchListProps) {
    const { users } = props;

    const getItems = (users: User[] | ChatUser[]) => {
      return users.map((user) => new UserSearchItemWithStore({ user }));
    };

    super({
      isLoading: false,
      lists: getItems(users),
    });

    this.getItems = getItems;
  }

  componentDidUpdate(
    oldProps: BlockProps & UsersSearchListProps,
    newProps: BlockProps & UsersSearchListProps,
  ): boolean {
    if (!isEqual(oldProps.users ?? {}, newProps.users ?? {})) {
      this.setLists({ lists: this.getItems(newProps.users) });
    }

    return true;
  }

  render(): string {
    return /* HTML */ `
      <ul class="${styles.userSearchList}">
        {{{ lists }}}
      </ul>
    `;
  }
}
