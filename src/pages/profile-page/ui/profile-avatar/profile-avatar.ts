import { Block } from "shared/constructors";
import { Button } from "shared/ui";
import styles from "./profile-avatar.module.scss";

export class ProfileAvatar extends Block {
  constructor() {
    super({
      Button: new Button({
        text: "Поменять аватар",
        variant: "transparent",
        className: styles.changeButton,
        onClick: () => this._handleChangeButtonClick.bind(this),
      }),
    });
  }

  _handleChangeButtonClick() {
    // TODO: Добавить смену аватара в следующих спринтах
  }

  override render() {
    return /* HTML */ `
      <div class="${styles.profileAvatar}">
        <div class="${styles.imageWrapper}">
          <img
            class="${styles.image}"
            src="/media/profile-avatar.svg"
            alt="Аватар пользователя"
            width="130"
            height="130"
          />

          {{{ Button }}}
        </div>

        <h2 class="${styles.name}">Иван</h2>
      </div>
    `;
  }
}
