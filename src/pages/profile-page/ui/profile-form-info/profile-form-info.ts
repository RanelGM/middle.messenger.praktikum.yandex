import { Block } from "shared/constructors";
import { cn, validateEmail, validateLogin, validateName, validatePhone } from "shared/lib";
import { Form } from "shared/ui";
import styles from "./profile-form-info.module.scss";
import inputStyles from "../profile-page.module.scss";

type Props = {
  isReadonly?: boolean;
};

const inputsClassNames = {
  classNameWrapper: inputStyles.inputWrapper,
  classNameLabel: inputStyles.inputLabel,
  classNameLabelText: inputStyles.inputLabelText,
  classNameInput: cn(inputStyles.input, "text-dots"),
};

export class ProfileFormInfo extends Block {
  constructor(props: Props) {
    const { isReadonly } = props;

    super({
      Form: new Form({
        inputs: [
          {
            labelText: "Почта",
            name: "email",
            type: "email",
            value: "pochta@yandex.ru",
            ...inputsClassNames,
            validate: validateEmail,
          },
          {
            labelText: "Логин",
            name: "login",
            type: "text",
            value: "ivanivanov",
            ...inputsClassNames,
            validate: validateLogin,
          },
          {
            labelText: "Имя",
            name: "first_name",
            type: "text",
            value: "Иван",
            ...inputsClassNames,
            validate: validateName,
          },
          {
            labelText: "Фамилия",
            name: "second_name",
            type: "text",
            value: "Иванов",
            ...inputsClassNames,
            validate: validateName,
          },
          {
            labelText: "Имя в чате",
            name: "display_name",
            type: "text",
            value: "Иван",
            ...inputsClassNames,
            validate: validateName,
          },
          {
            labelText: "Телефон",
            name: "phone",
            type: "tel",
            value: "+79099673030",
            ...inputsClassNames,
            validate: validatePhone,
          },
        ],
        submitText: isReadonly ? undefined : "Сохранить",
        className: isReadonly ? styles.readonly : "",
      }),
    });
  }

  override render() {
    return /* HTML */ ` {{{ Form }}} `;
  }
}
