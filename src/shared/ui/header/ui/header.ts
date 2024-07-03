import { Block } from "shared/constructors";
import styles from "./header.module.scss";

export class Header extends Block {
  override render() {
    return /* HTML */ `
      <header>
        <nav class="${styles.navigation}">
          <a class="${styles.navLink}" href="/signin" page="signin">Вход</a>
          <a class="${styles.navLink}" href="/signup" page="signup">Регистрация</a>
          <a class="${styles.navLink}" href="/profile" page="profile">Профиль</a>
          <a class="${styles.navLink} ${styles.navLink_disabled}" href="/chat" page="chat">Чат</a>
          <a class="${styles.navLink}" href="/error-not-found" page="error-not-found">404</a>
          <a class="${styles.navLink}" href="/error-server" page="error-server">500</a>
        </nav>
      </header>
    `;
  }
}
