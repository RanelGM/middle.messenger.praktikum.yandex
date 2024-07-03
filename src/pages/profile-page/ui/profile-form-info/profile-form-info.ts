import { Block } from "shared/constructors";
import { ProfileInput } from "../profile-input/profile-input";
import styles from "./profile-form-info.module.scss";

type Props = {
  isReadonly?: boolean;
};

export class ProfileFormInfo extends Block {
  constructor(props: Props) {
    super({
      ...props,
      InputEmail: new ProfileInput({ labelText: "Почта", name: "email", type: "email", value: "pochta@yandex.ru" }),
      InputLogin: new ProfileInput({ labelText: "Логин", name: "login", type: "text", value: "ivanivanov" }),
      InputFirstName: new ProfileInput({ labelText: "Имя", name: "first_name", type: "text", value: "Иван" }),
      InputSecondName: new ProfileInput({ labelText: "Фамилия", name: "second_name", type: "text", value: "Иванов" }),
      InputDisplayName: new ProfileInput({
        labelText: "Имя в чате",
        name: "display_name",
        type: "text",
        value: "Иван",
      }),
      InputPhone: new ProfileInput({ labelText: "Телефон", name: "phone", type: "tel", value: "+7 (909) 967 30 30" }),
    });
  }

  override render() {
    return /* HTML */ `
      <form {{#if isReadonly}}class="${styles.readonly}"{{/if}}>
        {{{ InputEmail }}}
        {{{ InputLogin }}}
        {{{ InputFirstName }}}
        {{{ InputSecondName }}}
        {{{ InputDisplayName }}}
        {{{ InputPhone }}}
      </form>
    `;
  }
}
